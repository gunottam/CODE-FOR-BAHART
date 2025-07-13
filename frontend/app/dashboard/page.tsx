"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Award, Heart, BookOpen, MessageCircle, Home } from "lucide-react"
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const averageMood = moodTrendData.reduce((sum, day) => sum + day.mood, 0) / moodTrendData.length
  const journalStreak = 7
  const totalEntries = 15
  const chatSessions = 23

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Home Button - positioned to the left of dashboard content */}
            <div className="mb-6">
              <Link href="/">
                <Button
                  variant="outline"
                  className="btn-glass-light dark:btn-glass flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Wellness Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Track your mental health journey and celebrate your progress</p>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48 focus-ring glassmorphism border-gray-200/50 dark:border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glassmorphism border-gray-200/50 dark:border-white/20">
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 scale-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Mood</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageMood.toFixed(1)}/5</p>
                      <p className="text-xs text-green-500 dark:text-green-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +0.3 from last week
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full glassmorphism border border-gray-200/50 dark:border-white/20 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-pink-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 scale-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Journal Streak</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{journalStreak} days</p>
                      <p className="text-xs text-blue-500 dark:text-blue-400 flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Keep it up!
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full glassmorphism border border-gray-200/50 dark:border-white/20 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 scale-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Entries</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEntries}</p>
                      <p className="text-xs text-purple-500 dark:text-purple-400 flex items-center mt-1">
                        <Award className="h-3 w-3 mr-1" />
                        Great progress
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full glassmorphism border border-gray-200/50 dark:border-white/20 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 scale-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Chat Sessions</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{chatSessions}</p>
                      <p className="text-xs text-orange-500 dark:text-orange-400 flex items-center mt-1">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        AI support used
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full glassmorphism border border-gray-200/50 dark:border-white/20 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Mood Trend Chart */}
              <Card className="glassmorphism border-gray-200/50 dark:border-white/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Mood Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={moodTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#a855f7"
                        strokeWidth={3}
                        dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#a855f7', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Mood Frequency Chart */}
              <Card className="glassmorphism border-gray-200/50 dark:border-white/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Mood Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={moodFrequencyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {moodFrequencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity Chart */}
            <div className="mb-8">
              <Card className="glassmorphism border-gray-200/50 dark:border-white/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="journal" fill="#a855f7" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="chat" fill="#ec4899" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={`glassmorphism border-gray-200/50 dark:border-white/20 transition-all duration-300 scale-hover ${achievement.earned ? 'hover:shadow-green-500/25' : 'hover:shadow-gray-500/25'}`}>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{achievement.description}</p>
                      <Badge
                        variant={achievement.earned ? "default" : "secondary"}
                        className={achievement.earned ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-400/30" : "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-400/30"}
                      >
                        {achievement.earned ? "Earned" : "Locked"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/journal">
                  <Card className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 scale-hover cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <BookOpen className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Write Journal Entry</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Record your thoughts and feelings</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/chatbot">
                  <Card className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 scale-hover cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Chat with AI</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Get support and guidance</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/resources">
                  <Card className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 scale-hover cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Heart className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Self-Care Resources</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Explore wellness tools</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
