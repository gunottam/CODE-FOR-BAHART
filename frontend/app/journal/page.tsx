"use client"

import { useState } from "react"
import { Header } from "@/components/header"
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

export default function JournalPage() {
  const [entries, setEntries] = useState(sampleEntries)
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

  const handleSaveEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry = {
        id: entries.length + 1,
        date: selectedDate || new Date(),
        mood: newEntry.mood,
        title: newEntry.title,
        content: newEntry.content,
        tags: newEntry.tags,
      }
      setEntries([entry, ...entries])
      setNewEntry({ title: "", content: "", mood: 3, tags: [] })
      setIsWriting(false)
      setSelectedDate(undefined)
    }
  }

  const toggleTag = (tag: string) => {
    setNewEntry((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMood = filterMood === "all" || entry.mood.toString() === filterMood
    return matchesSearch && matchesMood
  })

  const getMoodInfo = (mood: number) => {
    return moodEmojis.find((m) => m.value === mood) || moodEmojis[2]
  }

  return (
    <div className="min-h-screen gradient-calm">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Journal</h1>
            <p className="text-muted-foreground">Express your thoughts and track your emotional journey</p>
          </div>

          {/* New Entry Button */}
          {!isWriting && (
            <Card className="mb-8 border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors card-subtle">
              <CardContent className="p-8 text-center">
                <Button onClick={() => setIsWriting(true)} size="lg" className="focus-ring shadow-subtle">
                  <Plus className="mr-2 h-5 w-5" />
                  Write New Entry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* New Entry Form */}
          {isWriting && (
            <Card className="mb-8 border-primary/30 card-subtle">
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent border-border hover:bg-muted/50">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : format(new Date(), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 glass">
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
                  <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                  <Input
                    placeholder="How are you feeling today?"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                    className="focus-ring"
                  />
                </div>

                {/* Mood Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mood</label>
                  <div className="flex space-x-2">
                    {moodEmojis.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setNewEntry((prev) => ({ ...prev, mood: mood.value }))}
                        className={`p-3 rounded-lg border-2 transition-all focus-ring ${
                          newEntry.mood === mood.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-border/70"
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
                  <label className="block text-sm font-medium text-foreground mb-2">Your thoughts</label>
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
                  <label className="block text-sm font-medium text-foreground mb-2">Mood Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {moodTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-all focus-ring ${
                          newEntry.tags.includes(tag)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/70"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button onClick={handleSaveEntry} className="focus-ring shadow-subtle">
                    Save Entry
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsWriting(false)
                      setNewEntry({ title: "", content: "", mood: 3, tags: [] })
                    }}
                    className="focus-ring bg-transparent border-border hover:bg-muted/50"
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
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
              <SelectContent className="glass">
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
            {filteredEntries.length === 0 ? (
              <Card className="card-subtle">
                <CardContent className="p-8 text-center text-muted-foreground">
                  {searchTerm || filterMood
                    ? "No entries match your search criteria."
                    : "No journal entries yet. Start writing to track your journey!"}
                </CardContent>
              </Card>
            ) : (
              filteredEntries.map((entry) => {
                const moodInfo = getMoodInfo(entry.mood)
                return (
                  <Card key={entry.id} className="card-subtle hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{moodInfo.emoji}</span>
                          <div>
                            <CardTitle className="text-lg text-foreground">{entry.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{format(entry.date, "MMMM d, yyyy")}</p>
                          </div>
                        </div>
                        <Badge className={moodInfo.color}>{moodInfo.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground mb-4 leading-relaxed">{entry.content}</p>
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
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
