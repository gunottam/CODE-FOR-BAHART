"use client"

import { useState } from "react"
import Header from "@/components/header"
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
  { mood: "Very Sad", count: 2, color: "#fca5a5" },
  { mood: "Sad", count: 3, color: "#fdba74" },
  { mood: "Neutral", count: 4, color: "#fde047" },
  { mood: "Happy", count: 5, color: "#86efac" },
  { mood: "Very Happy", count: 3, color: "#7dd3fc" },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Wellness Dashboard</h1>
              <p className="text-gray-600">Track your mental health journey and celebrate your progress</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48 focus-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Mood</p>
                    <p className="text-2xl font-bold text-gray-900">{averageMood.toFixed(1)}/5</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +0.3 from last week
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Journal Streak</p>
                    <p className="text-2xl font-bold text-gray-900">{journalStreak} days</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Keep it up!
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Entries</p>
                    <p className="text-2xl font-bold text-gray-900">{totalEntries}</p>
                    <p className="text-xs text-purple-600 flex items-center mt-1">
                      <Award className="h-3 w-3 mr-1" />
                      Great progress
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Chat Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">{chatSessions}</p>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      AI support used
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Mood Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Mood Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip
                      formatter={(value) => [`${value}/5`, "Mood"]}
                      labelFormatter={(label) => `Date: ${label}`}
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
            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
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
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Activity and Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="journal" fill="#3b82f6" name="Journal Entries" />
                    <Bar dataKey="chat" fill="#10b981" name="Chat Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? "text-green-900" : "text-gray-600"}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? "text-green-700" : "text-gray-500"}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && <Badge className="bg-green-100 text-green-800">Earned</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Insights Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Personal Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Mood Patterns</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Best day of week</span>
                      <Badge variant="secondary">Friday</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Most common mood</span>
                      <Badge className="bg-green-100 text-green-800">Happy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Improvement trend</span>
                      <Badge className="bg-blue-100 text-blue-800">+15% this month</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Activity Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Journal consistency</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-16" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AI chat engagement</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={70} className="w-16" />
                        <span className="text-sm font-medium">70%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Goal completion</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={60} className="w-16" />
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">💡 Personalized Recommendation</h4>
                <p className="text-sm text-blue-800">
                  Your mood tends to be lower on Wednesdays. Consider scheduling self-care activities or reaching out to
                  friends on this day. Your journaling streak is impressive - keep it up!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
