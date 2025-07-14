"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageSquare, User, Heart, Quote, Send, ThumbsUp, SortAsc, SortDesc } from "lucide-react"

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false)
  const [sortBy, setSortBy] = useState<"date" | "likes">("likes")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch("http://localhost:2001/api/feedback/")
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await fetch("http://localhost:2001/api/feedback/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback)
    });
    setFeedback({ name: "", email: "", message: "", rating: 5 });
    setShowForm(false);
    setIsSubmitting(false);
    alert("Thank you for your feedback! Your review has been added.");
    // Refresh feedbacks
    fetch("http://localhost:2001/api/feedback/")
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }

  const handleLike = (feedbackId: string) => {
    // This function will need to be updated to call an API endpoint for liking
    // For now, it will just update the local state, which won't persist
    // A proper implementation would involve an API call to update likes
    console.log("Like feedback:", feedbackId);
    // Example: setFeedbacks(prev => prev.map(fb => fb.id === feedbackId ? { ...fb, likes: fb.likes + 1 } : fb));
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="container mx-auto px-4 py-8 fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">User Feedback</h1>
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button className="btn-futuristic" onClick={() => setShowForm(!showForm)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              {showForm ? "Hide Feedback Form" : "Leave Feedback"}
            </Button>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={v => setSortBy(v as any)}>
                <SelectTrigger className="w-32 glassmorphism-light dark:glassmorphism">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glassmorphism-light dark:glassmorphism">
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="date">Most Recent</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="btn-glass-light dark:btn-glass"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                aria-label="Toggle sort order"
              >
                {sortOrder === "asc" ? <SortAsc /> : <SortDesc />}
              </Button>
            </div>
          </div>

          {showForm && (
            <Card className="glassmorphism border-gray-200/50 dark:border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Share Your Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name (optional)</Label>
                    <Input
                      id="name"
                      value={feedback.name}
                      onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={feedback.email}
                      onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Your Feedback</Label>
                    <Textarea
                      id="message"
                      value={feedback.message}
                      onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                      className="bg-white/50 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Share your experience with MindEase..."
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Rating</Label>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedback({ ...feedback, rating: star })}
                          className="text-2xl hover:scale-110 transition-transform"
                          aria-label={`Set rating to ${star}`}
                        >
                          {star <= feedback.rating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1 btn-glass-light dark:btn-glass"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-futuristic"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-6">
            {feedbacks
              .slice()
              .sort((a, b) => {
                if (sortBy === "likes") {
                  return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes
                } else {
                  return sortOrder === "asc"
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }
              })
              .map((fb) => (
                <Card key={fb.id} className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 scale-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Quote className="h-8 w-8 text-purple-400 opacity-60" />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < fb.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 dark:text-gray-500"
                              }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6 italic">
                      "{fb.message}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {fb.name || "Anonymous User"}
                          </h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Heart className="h-3 w-3 text-red-400" />
                            <span>Verified User</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-sm text-gray-400">
                          {new Date(fb.createdAt).toLocaleString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-pink-500"
                          onClick={() => handleLike(fb.id)}
                          aria-label="Like feedback"
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span className="ml-1 text-xs">{fb.likes || 0}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
} 