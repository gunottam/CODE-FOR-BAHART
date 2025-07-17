"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { Send, Bot, User, Heart, AlertTriangle, Phone } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "crisis" | "normal"
}

const quickActions = [
  "I'm feeling anxious",
  "Help me with stress",
  "I need motivation",
  "Breathing exercises",
  "I'm having a bad day",
  "Self-care tips",
]

const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "die", "crisis"]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hello! I'm your MindEase AI companion. I'm here to listen and support you through whatever you're experiencing. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  // Attach ref directly to the ScrollArea viewport
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null)
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change (robust)
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // Show/hide scroll-to-bottom button
  useEffect(() => {
    const scrollArea = scrollAreaViewportRef.current
    if (!scrollArea) return
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea
      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 40)
    }
    scrollArea.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => scrollArea.removeEventListener('scroll', handleScroll)
  }, [messages])

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some((keyword) => message.toLowerCase().includes(keyword.toLowerCase()))
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const botResponse: Message = {
        id: messages.length + 2,
        content: data.reply,
        sender: "bot",
        timestamp: new Date(),
        type: detectCrisis(inputValue) ? "crisis" : "normal",
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')

      // Fallback to mock response if API fails
      const fallbackResponse: Message = {
        id: messages.length + 2,
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
  }

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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Companion</h1>
              <p className="text-gray-600 dark:text-gray-300">Your supportive AI companion is here to listen and help</p>
            </div>

            {/* Crisis Alert */}
            <Card className="mb-6 glassmorphism border-red-300/50 dark:border-red-400/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
                  <div className="flex-1">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      <strong>Crisis Support:</strong> If you're in immediate danger, call 911. For mental health crisis
                      support, call 988 or text HOME to 741741.
                    </p>
                  </div>
                  <a href="tel:911">
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-glass-light dark:btn-glass border-red-300/50 dark:border-red-400/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Get Help
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Quick Actions Sidebar */}
              <div className="lg:col-span-1">
                <Card className="glassmorphism border-gray-200/50 dark:border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 px-3 focus-ring btn-glass-light dark:btn-glass"
                        onClick={() => handleQuickAction(action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col glassmorphism border-gray-200/50 dark:border-white/20">
                  <CardHeader className="border-b border-gray-200/50 dark:border-white/20">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full glassmorphism border border-gray-200/50 dark:border-white/20 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">MindEase AI</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Always here to listen</p>
                      </div>
                      <div className="ml-auto">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <ScrollAreaPrimitive.Viewport
                      ref={scrollAreaViewportRef}
                      className="h-full w-full rounded-[inherit]"
                      style={{ height: "100%" }}
                    >
                      <div className="space-y-4 h-full relative">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === "user"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                : "glassmorphism border border-gray-200/50 dark:border-white/20 text-gray-900 dark:text-white"
                                }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                              </p>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="glassmorphism border border-gray-200/50 dark:border-white/20 px-4 py-2 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={endOfMessagesRef} />
                      </div>
                    </ScrollAreaPrimitive.Viewport>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200/50 dark:border-white/20">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 bg-white/50 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white/20 dark:focus:bg-white/20 focus:border-purple-400 focus:ring-purple-400/50"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="btn-futuristic"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
