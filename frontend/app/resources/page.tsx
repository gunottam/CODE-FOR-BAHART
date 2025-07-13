"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ExternalLink, Download, Play, Phone, Heart, Brain, Leaf, Moon } from "lucide-react"

const categories = [
  { id: "all", name: "All Resources", icon: Heart },
  { id: "crisis", name: "Crisis Support", icon: Phone },
  { id: "anxiety", name: "Anxiety & Stress", icon: Brain },
  { id: "depression", name: "Depression", icon: Heart },
  { id: "mindfulness", name: "Mindfulness", icon: Leaf },
  { id: "sleep", name: "Sleep & Rest", icon: Moon },
]

const resources = [
  {
    id: 1,
    title: "National Suicide Prevention Lifeline",
    description: "24/7 free and confidential support for people in distress and prevention resources.",
    category: "crisis",
    type: "hotline",
    contact: "988",
    url: "https://suicidepreventionlifeline.org",
    featured: true,
  },
  {
    id: 2,
    title: "Crisis Text Line",
    description: "Free, 24/7 support for those in crisis. Text HOME to connect with a counselor.",
    category: "crisis",
    type: "text",
    contact: "Text HOME to 741741",
    url: "https://crisistextline.org",
    featured: true,
  },
  {
    id: 3,
    title: "5-Minute Breathing Exercise",
    description: "A guided breathing exercise to help reduce anxiety and promote calm.",
    category: "anxiety",
    type: "audio",
    duration: "5 min",
    featured: false,
  },
  {
    id: 4,
    title: "Progressive Muscle Relaxation Guide",
    description: "Step-by-step guide to release physical tension and mental stress.",
    category: "anxiety",
    type: "guide",
    downloadable: true,
    featured: false,
  },
  {
    id: 5,
    title: "Understanding Depression: A Comprehensive Guide",
    description: "Educational resource about depression symptoms, causes, and treatment options.",
    category: "depression",
    type: "article",
    readTime: "15 min",
    featured: false,
  },
  {
    id: 6,
    title: "Daily Mindfulness Meditation",
    description: "10-minute guided meditation for developing mindfulness and present-moment awareness.",
    category: "mindfulness",
    type: "audio",
    duration: "10 min",
    featured: true,
  },
  {
    id: 7,
    title: "Sleep Hygiene Checklist",
    description: "Practical tips and habits for improving sleep quality and establishing healthy routines.",
    category: "sleep",
    type: "checklist",
    downloadable: true,
    featured: false,
  },
  {
    id: 8,
    title: "Anxiety Coping Strategies Worksheet",
    description: "Interactive worksheet to identify triggers and develop personalized coping strategies.",
    category: "anxiety",
    type: "worksheet",
    downloadable: true,
    featured: false,
  },
]

const articles = [
  {
    id: 1,
    title: "Understanding Mental Health: Breaking the Stigma",
    excerpt: "Mental health is just as important as physical health. Learn how to recognize signs and seek support.",
    readTime: "8 min",
    category: "Education",
    featured: true,
  },
  {
    id: 2,
    title: "Building Resilience in Difficult Times",
    excerpt: "Practical strategies for developing emotional resilience and bouncing back from challenges.",
    readTime: "12 min",
    category: "Coping Skills",
    featured: false,
  },
  {
    id: 3,
    title: "The Science of Gratitude and Mental Wellness",
    excerpt: "Research-backed benefits of gratitude practice and how to incorporate it into daily life.",
    readTime: "6 min",
    category: "Wellness",
    featured: true,
  },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Play className="h-4 w-4" />
      case "guide":
      case "article":
        return <ExternalLink className="h-4 w-4" />
      case "worksheet":
      case "checklist":
        return <Download className="h-4 w-4" />
      case "hotline":
      case "text":
        return <Phone className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  const getResourceBadgeColor = (type: string) => {
    switch (type) {
      case "hotline":
      case "text":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
      case "audio":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200"
      case "guide":
      case "article":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
      case "worksheet":
      case "checklist":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="container mx-auto px-4 py-8 fade-in">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Mental Health Resources</h1>
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="flex flex-wrap gap-2 justify-center glassmorphism p-2">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 focus-ring"
                  >
                    <cat.icon className="h-4 w-4" aria-hidden="true" />
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 glassmorphism-light dark:glassmorphism"
              aria-label="Search resources"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredResources.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
                <p>No resources found for your search or filter.</p>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 scale-hover">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      {getResourceIcon(resource.type)}
                      {resource.title}
                    </CardTitle>
                    <Badge className={getResourceBadgeColor(resource.type)}>{resource.type}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{resource.description}</p>
                    {resource.contact && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <span className="font-medium">Contact:</span> {resource.contact}
                      </p>
                    )}
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline hover-glow"
                        aria-label={`Visit ${resource.title}`}
                      >
                        Visit Resource <ExternalLink className="h-4 w-4 ml-1" aria-hidden="true" />
                      </a>
                    )}
                    {resource.downloadable && (
                      <Button variant="outline" size="sm" className="mt-2 btn-glass-light dark:btn-glass">
                        <Download className="h-4 w-4 mr-1" aria-hidden="true" /> Download
                      </Button>
                    )}
                    {resource.duration && (
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{resource.duration}</span>
                    )}
                    {resource.readTime && (
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{resource.readTime}</span>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
                <p>No articles found.</p>
              </div>
            ) : (
              articles.map((article) => (
                <Card key={article.id} className="glassmorphism border-gray-200/50 dark:border-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 scale-hover">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
