"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageSquare, User, Heart, Quote } from "lucide-react"

export default function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:2001/api/feedback/")
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, []);
  const topFeedbacks = feedbacks.slice(0, 4);

  if (topFeedbacks.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Be the first to share your experience with MindEase and help others on their mental health journey.
              Your feedback inspires our community and helps us improve our services.
            </p>
            <div className="glassmorphism rounded-2xl p-12 shadow-lg border border-gray-200/50 dark:border-white/20 max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <Quote className="h-12 w-12 text-purple-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg italic mb-4">
                "No feedback yet. Share your thoughts and be the first!"
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Your voice matters. Help others by sharing your MindEase experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real feedback from our community of users who are improving their mental health with MindEase.
            Join thousands of users who trust us with their wellness journey.
          </p>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {topFeedbacks.map((feedback) => (
            <Card key={feedback._id} className="group glassmorphism border border-gray-200/50 dark:border-white/20 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 scale-hover">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-8 w-8 text-purple-400 opacity-60" />
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < feedback.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 dark:text-gray-500"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Feedback Message */}
                <blockquote className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6 italic">
                  "{feedback.message}"
                </blockquote>

                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {feedback.name || "Anonymous User"}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Heart className="h-3 w-3 text-red-400" />
                        <span>Verified User</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">
                      {new Date(feedback.createdAt).toLocaleString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glassmorphism rounded-2xl p-8 border border-gray-200/50 dark:border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your feedback helps others and improves our platform. Join our growing community of users.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <MessageSquare className="h-4 w-4" />
              <span>Click the Feedback button in the header to share your thoughts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 