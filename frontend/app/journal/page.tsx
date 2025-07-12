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
import { CalendarIcon, Plus, Search, Filter } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Journal</h1>
            <p className="text-gray-600">Express your thoughts and track your emotional journey</p>
          </div>

          {/* New Entry Button */}
          {!isWriting && (
            <Card className="mb-8 border-dashed border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-8 text-center">
                <Button onClick={() => setIsWriting(true)} size="lg" className="focus-ring">
                  <Plus className="mr-2 h-5 w-5" />
                  Write New Entry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* New Entry Form */}
          {isWriting && (
            <Card className="mb-8 border-blue-200">
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : format(new Date(), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate || new Date()}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <Input
                    placeholder="How are you feeling today?"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                    className="focus-ring"
                  />
                </div>

                {/* Mood Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
                  <div className="flex space-x-2">
                    {moodEmojis.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setNewEntry((prev) => ({ ...prev, mood: mood.value }))}
                        className={`p-3 rounded-lg border-2 transition-all focus-ring ${
                          newEntry.mood === mood.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title={mood.label}
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your thoughts</label>
                  <Textarea
                    placeholder="Write about your day, feelings, or anything on your mind..."
                    value={newEntry.content}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    className="focus-ring"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mood Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {moodTags.map((tag: string) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-all focus-ring ${
                          newEntry.tags.includes(tag)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button onClick={handleSaveEntry} className="focus-ring">
                    Save Entry
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsWriting(false)
                      setNewEntry({ title: "", content: "", mood: 3, tags: [] })
                    }}
                    className="focus-ring"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search your entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus-ring"
              />
            </div>
            <Select value={filterMood} onValueChange={setFilterMood}>
              <SelectTrigger className="w-full sm:w-48 focus-ring">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All moods</SelectItem>
                {moodEmojis.map((mood) => (
                  <SelectItem key={mood.value} value={mood.value.toString()}>
                    {mood.emoji} {mood.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Entries List */}
          <div className="space-y-6">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">Loading entries...</CardContent>
              </Card>
            ) : error ? (
              <Card>
                <CardContent className="p-8 text-center text-red-500">{error}</CardContent>
              </Card>
            ) : filteredEntries.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  {searchTerm || filterMood
                    ? "No entries match your search criteria."
                    : "No journal entries yet. Start writing to track your journey!"}
                </CardContent>
              </Card>
            ) : (
              filteredEntries.map((entry) => {
                const moodInfo = getMoodInfo(entry.mood)
                return (
                  <Card key={entry.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{moodInfo.emoji}</span>
                          <div>
                            <CardTitle className="text-lg">{entry.title}</CardTitle>
                            <p className="text-sm text-gray-500">{format(entry.date, "MMMM d, yyyy")}</p>
                          </div>
                        </div>
                        <Badge className={moodInfo.color}>{moodInfo.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">{entry.content}</p>
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
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
