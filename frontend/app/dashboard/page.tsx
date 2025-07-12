"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, TrendingUp, Award, Heart, BookOpen, MessageCircle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for charts
const moodTrendData = [
  { date: "1/1", mood: 3 },
  { date: "1/2", mood: 4 },
  { date: "1/3", mood: 2 },
  { date: "1/4", mood: 3 },
  { date: "1/5", mood: 4 },
  { date: "1/6", mood: 5 },
  { date: "1/7", mood: 4 },
  { date: "1/8", mood: 3 },
  { date: "1/9", mood: 4 },
  { date: "1/10", mood: 5 },
  { date: "1/11", mood: 4 },
  { date: "1/12", mood: 3 },
  { date: "1/13", mood: 5 },
  { date: "1/14", mood: 2 },
  { date: "1/15", mood: 4 },
]

const moodFrequencyData = [
  { mood: "Very Sad", count: 2, color: "#3b82f6" },
  { mood: "Sad", count: 3, color: "#60a5fa" },
  { mood: "Neutral", count: 4, color: "#93c5fd" },
  { mood: "Happy", count: 5, color: "#bfdbfe" },
  { mood: "Very Happy", count: 3, color: "#dbeafe" },
]

const weeklyActivityData = [
  { day: "Mon", journal: 1, chat: 3 },
  { day: "Tue", journal: 1, chat: 2 },
  { day: "Wed", journal: 0, chat: 4 },
  { day: "Thu", journal: 1, chat: 1 },
  { day: "Fri", journal: 1, chat: 5 },
  { day: "Sat", journal: 1, chat: 2 },
  { day: "Sun", journal: 1, chat: 3 },
]

const achievements = [
  { title: "7-Day Streak", description: "Journaled for 7 consecutive days", icon: "🔥", earned: true },
  { title: "Mood Tracker", description: "Tracked mood for 30 days", icon: "📊", earned: true },
  { title: "Self-Care Champion", description: "Completed 10 self-care activities", icon: "💆‍♀️", earned: false },
  { title: "Mindful Moments", description: "Used breathing exercises 20 times", icon: "🧘‍♀️", earned: true },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("week")

  const averageMood = moodTrendData.reduce((sum, day) => sum + day.mood, 0) / moodTrendData.length
  const journalStreak = 7
  const totalEntries = 15
  const chatSessions = 23

  return (
    <ProtectedRoute>
      <div className="min-h-screen gradient-calm">
        <Header />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Your Wellness Dashboard</h1>
              <p className="text-muted-foreground">Track your mental health journey and celebrate your progress</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48 focus-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass">
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-subtle">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Mood</p>
                    <p className="text-2xl font-bold text-foreground">{averageMood.toFixed(1)}/5</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +0.3 from last week
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-subtle">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Journal Streak</p>
                    <p className="text-2xl font-bold text-foreground">{journalStreak} days</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Keep it up!
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-subtle">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Entries</p>
                    <p className="text-2xl font-bold text-foreground">{totalEntries}</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <Award className="h-3 w-3 mr-1" />
                      Great progress
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-subtle">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Chat Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{chatSessions}</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      AI support used
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Mood Trend Chart */}
            <Card className="card-subtle">
              <CardHeader>
                <CardTitle className="text-foreground">Mood Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis domain={[1, 5]} stroke="#64748b" />
                    <Tooltip
                      formatter={(value) => [`${value}/5`, "Mood"]}
                      labelFormatter={(label) => `Date: ${label}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mood Distribution */}
            <Card className="card-subtle">
              <CardHeader>
                <CardTitle className="text-foreground">Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={moodFrequencyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ mood, count }) => `${mood}: ${count}`}
                    >
                      {moodFrequencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Activity and Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Activity */}
            <Card className="lg:col-span-2 card-subtle">
              <CardHeader>
                <CardTitle className="text-foreground">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="journal" fill="#3b82f6" name="Journal Entries" />
                    <Bar dataKey="chat" fill="#60a5fa" name="Chat Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-subtle">
              <CardHeader>
                <CardTitle className="text-foreground">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30" : "bg-muted/50 border border-border/50"
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? "text-blue-900 dark:text-blue-100" : "text-muted-foreground"}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? "text-blue-700 dark:text-blue-200" : "text-muted-foreground"}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">Earned</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Insights Section */}
          <Card className="mt-8 card-subtle">
            <CardHeader>
              <CardTitle className="text-foreground">Personal Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Mood Patterns</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Best day of week</span>
                      <Badge variant="secondary">Friday</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Most common mood</span>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">Happy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Improvement trend</span>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">+15% this month</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Activity Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Journal consistency</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-16" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">AI chat engagement</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={70} className="w-16" />
                        <span className="text-sm font-medium">70%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Goal completion</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={60} className="w-16" />
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Personalized Recommendation</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your mood tends to be lower on Wednesdays. Consider scheduling self-care activities or reaching out to
                  friends on this day. Your journaling streak is impressive - keep it up!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      </div>
    </ProtectedRoute>
  )
}
