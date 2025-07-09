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
        return "bg-red-100 text-red-800"
      case "audio":
        return "bg-blue-100 text-blue-800"
      case "guide":
      case "article":
        return "bg-green-100 text-green-800"
      case "worksheet":
      case "checklist":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Resources</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Curated resources, tools, and support to help you on your mental health journey. Remember, seeking help is
              a sign of strength.
            </p>
          </div>

          {/* Crisis Alert */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Need immediate help?</h3>
                  <p className="text-red-800 mb-3">
                    If you're in crisis or having thoughts of self-harm, please reach out immediately:
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 988
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                      Text HOME to 741741
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                      Call 911
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="resources" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resources">Resources & Tools</TabsTrigger>
              <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 focus-ring"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="focus-ring"
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Featured Resources */}
              {selectedCategory === "all" && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources
                      .filter((r) => r.featured)
                      .map((resource) => (
                        <Card
                          key={resource.id}
                          className="border-blue-200 bg-blue-50 hover:shadow-md transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg text-blue-900">{resource.title}</CardTitle>
                              <Badge className={getResourceBadgeColor(resource.type)}>{resource.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-blue-800 mb-4 leading-relaxed">{resource.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-blue-700">
                                {resource.contact && <span>{resource.contact}</span>}
                                {resource.duration && <span>{resource.duration}</span>}
                                {resource.readTime && <span>{resource.readTime} read</span>}
                              </div>
                              <Button size="sm" className="focus-ring">
                                {getResourceIcon(resource.type)}
                                <span className="ml-2">
                                  {resource.type === "hotline" || resource.type === "text"
                                    ? "Contact"
                                    : resource.downloadable
                                      ? "Download"
                                      : "Access"}
                                </span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}

              {/* All Resources */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {selectedCategory === "all"
                    ? "All Resources"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <Badge className={getResourceBadgeColor(resource.type)}>{resource.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {resource.contact && <span>{resource.contact}</span>}
                            {resource.duration && <span>{resource.duration}</span>}
                            {resource.readTime && <span>{resource.readTime} read</span>}
                          </div>
                          <Button size="sm" variant="outline" className="focus-ring bg-transparent">
                            {getResourceIcon(resource.type)}
                            <span className="ml-2">
                              {resource.type === "hotline" || resource.type === "text"
                                ? "Contact"
                                : resource.downloadable
                                  ? "Download"
                                  : "Access"}
                            </span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="articles" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className={`hover:shadow-md transition-shadow ${
                      article.featured ? "border-green-200 bg-green-50" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className={`text-lg ${article.featured ? "text-green-900" : ""}`}>
                          {article.title}
                        </CardTitle>
                        <Badge variant="secondary">{article.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`mb-4 leading-relaxed ${article.featured ? "text-green-800" : "text-gray-600"}`}>
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${article.featured ? "text-green-700" : "text-gray-500"}`}>
                          {article.readTime} read
                        </span>
                        <Button size="sm" variant="outline" className="focus-ring bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
