"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Search, Filter, Sparkles, PenTool, BookOpen, Zap } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Very Sad", color: "mood-very-sad" },
  { value: 2, emoji: "😔", label: "Sad", color: "mood-sad" },
  { value: 3, emoji: "😐", label: "Neutral", color: "mood-neutral" },
  { value: 4, emoji: "😊", label: "Happy", color: "mood-happy" },
  { value: 5, emoji: "😄", label: "Very Happy", color: "mood-very-happy" },
]

const moodTags = [
  "anxious",
  "grateful",
  "tired",
  "energetic",
  "stressed",
  "calm",
  "excited",
  "lonely",
  "confident",
  "overwhelmed",
  "peaceful",
  "frustrated",
]

const sampleEntries = [
  {
    id: 1,
    date: new Date("2024-01-15"),
    mood: 4,
    title: "Great day at work",
    content:
      "Had a productive meeting today and felt really good about the presentation I gave. The team was supportive and I felt confident.",
    tags: ["confident", "energetic"],
  },
  {
    id: 2,
    date: new Date("2024-01-14"),
    mood: 2,
    title: "Feeling overwhelmed",
    content:
      "Too many deadlines this week. Feeling stressed about everything I need to get done. Need to remember to take breaks.",
    tags: ["stressed", "overwhelmed"],
  },
  {
    id: 3,
    date: new Date("2024-01-13"),
    mood: 5,
    title: "Weekend with friends",
    content:
      "Spent the day hiking with friends. The weather was perfect and I felt so grateful for the people in my life. Nature always helps me feel centered.",
    tags: ["grateful", "peaceful", "energetic"],
  },
]

// Get user from localStorage
const getUserId = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        return JSON.parse(user)._id;
      } catch {
        return null;
      }
    }
  }
  return null;
};

const BACKEND_URL = "http://localhost:5000";

export default function JournalPage() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [entries, setEntries] = useState<any[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: 3,
    tags: [] as string[],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMood, setFilterMood] = useState<string>("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Route protection: redirect to login if not logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        window.location.href = "/login";
      }
    }
  }, [])

  const USER_ID = getUserId();

  // Fetch entries from backend
  useEffect(() => {
    if (!USER_ID) return;
    const fetchEntries = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${BACKEND_URL}/api/journal/user/${USER_ID}`)
        if (!res.ok) throw new Error("Failed to fetch entries")
        const data = await res.json()
        setEntries(
          data.map((entry: any) => ({
            ...entry,
            date: new Date(entry.date),
            id: entry._id || entry.id,
          }))
        )
      } catch (err) {
        setError("Could not load journal entries.")
      } finally {
        setLoading(false)
      }
    }
    fetchEntries()
  }, [USER_ID])

  const handleSaveEntry = async () => {
    if (!USER_ID) return;
    if (newEntry.title.trim() && newEntry.content.trim()) {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${BACKEND_URL}/api/journal/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: USER_ID,
            title: newEntry.title,
            content: newEntry.content,
            mood: newEntry.mood,
            tags: newEntry.tags,
            date: selectedDate || new Date(),
          }),
        })
        if (!res.ok) throw new Error("Failed to save entry")
        // Optionally, you can get the new entry from res.json()
        // Refresh entries
        const refreshed = await fetch(`${BACKEND_URL}/api/journal/user/${USER_ID}`)
        const refreshedData = await refreshed.json()
        setEntries(
          refreshedData.map((entry: any) => ({
            ...entry,
            date: new Date(entry.date),
            id: entry._id || entry.id,
          }))
        )
        setNewEntry({ title: "", content: "", mood: 3, tags: [] })
        setIsWriting(false)
        setSelectedDate(undefined)
      } catch (err) {
        setError("Could not save entry.")
      } finally {
        setLoading(false)
      }
    }
  }

  // Fix linter error: explicitly type 'tag' as string
  const toggleTag = (tag: string) => {
    setNewEntry((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t: string) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const filteredEntries = entries.filter((entry) => {
    const title = entry.title || "";
    const content = entry.content || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = filterMood === "all" || entry.mood.toString() === filterMood;
    return matchesSearch && matchesMood;
  })

  const getMoodInfo = (mood: number) => {
    return moodEmojis.find((m) => m.value === mood) || moodEmojis[2]
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="container mx-auto px-4 py-8 fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Journal</h1>
          {/* New Entry Button */}
          {!isWriting && (
            <Card className={`mb-8 border-dashed border-2 transition-all duration-300 transform hover:scale-105 ${isDark
              ? "border-purple-400/30 hover:border-purple-400/50 bg-white/5 backdrop-blur-xl backdrop-saturate-150 hover:shadow-purple-500/25"
              : "border-blue-200 hover:border-blue-300 bg-white/50 hover:shadow-lg"
              }`}>
              <CardContent className="p-8 text-center">
                <Button
                  onClick={() => setIsWriting(true)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus:ring-2 focus:ring-purple-500/50"
                >
                  <PenTool className="mr-2 h-5 w-5" />
                  Write New Entry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* New Entry Form */}
          {isWriting && (
            <Card className={`mb-8 transform transition-all duration-500 hover:scale-105 ${isDark
              ? "border-purple-400/30 bg-white/10 backdrop-blur-xl backdrop-saturate-150 hover:shadow-purple-500/25"
              : "border-blue-200 bg-white/80 hover:shadow-lg"
              }`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className={isDark ? "text-white" : "text-gray-900"}>
                    New Journal Entry
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Picker */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                    Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={`w-full justify-start text-left font-normal transition-all duration-300 backdrop-blur-sm ${isDark
                        ? "bg-white/10 border-white/20 text-white hover:bg-white/20 focus:bg-white/20 focus:border-purple-400 focus:ring-purple-400/50"
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50 focus:bg-white focus:border-purple-400 focus:ring-purple-400/50"
                        }`}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : format(new Date(), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={`w-auto p-0 ${isDark
                      ? "bg-white/10 backdrop-blur-xl border-white/20"
                      : "bg-white border-gray-200"
                      }`}>
                      <Calendar
                        mode="single"
                        selected={selectedDate || new Date()}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="bg-transparent"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Title */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                    Title
                  </label>
                  <Input
                    placeholder="How are you feeling today?"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                    className={`transition-all duration-300 backdrop-blur-sm ${isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-purple-400 focus:ring-purple-400/50"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-purple-400 focus:ring-purple-400/50"
                      }`}
                  />
                </div>

                {/* Mood Selector */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                    Mood
                  </label>
                  <div className="flex space-x-3">
                    {moodEmojis.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setNewEntry((prev) => ({ ...prev, mood: mood.value }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 focus-ring transform hover:scale-110 ${newEntry.mood === mood.value
                          ? "border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25"
                          : isDark
                            ? "border-white/20 hover:border-purple-400/50 bg-white/5 hover:bg-white/10"
                            : "border-gray-200 hover:border-purple-400/50 bg-white hover:bg-gray-50"
                          }`}
                        title={mood.label}
                      >
                        <span className="text-3xl">{mood.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                    Your thoughts
                  </label>
                  <Textarea
                    placeholder="Write about your day, feelings, or anything on your mind..."
                    value={newEntry.content}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    className={`transition-all duration-300 backdrop-blur-sm resize-none ${isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-purple-400 focus:ring-purple-400/50"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-purple-400 focus:ring-purple-400/50"
                      }`}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                    Mood Tags
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {moodTags.map((tag: string) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 focus-ring transform hover:scale-105 ${newEntry.tags.includes(tag)
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                          : isDark
                            ? "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleSaveEntry}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus:ring-2 focus:ring-purple-500/50"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Save Entry
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsWriting(false)
                      setNewEntry({ title: "", content: "", mood: 3, tags: [] })
                    }}
                    className={`transition-all duration-300 backdrop-blur-sm ${isDark
                      ? "border-white/20 text-white hover:bg-white/10 focus:bg-white/10 focus:border-purple-400 focus:ring-purple-400/50"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50 focus:bg-white focus:border-purple-400 focus:ring-purple-400/50"
                      }`}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"
                }`} />
              <Input
                placeholder="Search your entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 transition-all duration-300 backdrop-blur-sm ${isDark
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-purple-400 focus:ring-purple-400/50"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-purple-400 focus:ring-purple-400/50"
                  }`}
              />
              {isDark && (
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              )}
            </div>
            <Select value={filterMood} onValueChange={setFilterMood}>
              <SelectTrigger className={`w-full sm:w-48 transition-all duration-300 backdrop-blur-sm ${isDark
                ? "bg-white/10 border-white/20 text-white focus:bg-white/20 focus:border-purple-400 focus:ring-purple-400/50"
                : "bg-white border-gray-200 text-gray-900 focus:bg-white focus:border-purple-400 focus:ring-purple-400/50"
                }`}>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by mood" />
              </SelectTrigger>
              <SelectContent className={isDark ? "bg-white/10 backdrop-blur-xl border-white/20" : "bg-white border-gray-200"}>
                <SelectItem value="all" className={isDark ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-50"}>
                  All moods
                </SelectItem>
                {moodEmojis.map((mood) => (
                  <SelectItem key={mood.value} value={mood.value.toString()} className={isDark ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-50"}>
                    {mood.emoji} {mood.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Entries List */}
          <div className="space-y-6">
            {loading ? (
              <Card className={isDark ? "bg-white/10 backdrop-blur-xl backdrop-saturate-150" : "bg-white"}>
                <CardContent className={`p-8 text-center ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                  Loading entries...
                </CardContent>
              </Card>
            ) : error ? (
              <Card className={isDark ? "bg-white/10 backdrop-blur-xl backdrop-saturate-150" : "bg-white"}>
                <CardContent className={`p-8 text-center ${isDark ? "text-red-300" : "text-red-500"}`}>
                  {error}
                </CardContent>
              </Card>
            ) : filteredEntries.length === 0 ? (
              <Card className={isDark ? "bg-white/10 backdrop-blur-xl backdrop-saturate-150" : "bg-white"}>
                <CardContent className={`p-8 text-center ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                  {searchTerm || filterMood
                    ? "No entries match your search criteria."
                    : "No journal entries yet. Start writing to track your journey!"}
                </CardContent>
              </Card>
            ) : (
              filteredEntries.map((entry) => {
                const moodInfo = getMoodInfo(entry.mood)
                return (
                  <Card key={entry.id} className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${isDark
                    ? "hover:shadow-purple-500/25 bg-white/10 backdrop-blur-xl backdrop-saturate-150 border-white/20"
                    : "hover:shadow-lg bg-white"
                    }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full backdrop-blur-sm ${isDark
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                            : "bg-gradient-to-r from-purple-100 to-pink-100"
                            }`}>
                            <span className="text-3xl">{moodInfo.emoji}</span>
                          </div>
                          <div>
                            <CardTitle className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                              {entry.title}
                            </CardTitle>
                            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                              {format(entry.date, "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${moodInfo.color} ${isDark
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-white/20"
                          : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200"
                          }`}>
                          {moodInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`mb-4 leading-relaxed ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                        {entry.content}
                      </p>
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className={`text-xs ${isDark
                              ? "bg-white/10 text-gray-300 border-white/20"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                              }`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
