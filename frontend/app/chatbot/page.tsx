"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Heart, AlertTriangle, Phone } from "lucide-react"

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

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some((keyword) => message.toLowerCase().includes(keyword.toLowerCase()))
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (detectCrisis(userMessage)) {
      return "I'm really concerned about what you're sharing. Your life has value and there are people who want to help. Please reach out to a crisis counselor immediately at 988 (Suicide & Crisis Lifeline) or text HOME to 741741. You don't have to go through this alone."
    }

    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
      return "I hear that you're feeling anxious. That's a very common experience, and it's brave of you to reach out. Try this: Take a slow, deep breath in for 4 counts, hold for 4, then exhale for 6. This can help activate your body's relaxation response. What's making you feel anxious right now?"
    }

    if (lowerMessage.includes("stress") || lowerMessage.includes("stressed")) {
      return "Stress can feel overwhelming, but you're taking a positive step by talking about it. Here are some quick stress-relief techniques: 1) Try the 5-4-3-2-1 grounding technique (5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste), 2) Take a short walk, 3) Practice deep breathing. What's your biggest source of stress right now?"
    }

    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down")) {
      return "I'm sorry you're feeling this way. Your feelings are valid, and it's okay to not be okay sometimes. Remember that difficult emotions are temporary, even when they don't feel like it. Have you been able to do any small self-care activities today, like drinking water, getting some sunlight, or connecting with someone you care about?"
    }

    if (lowerMessage.includes("motivation") || lowerMessage.includes("motivated")) {
      return "Finding motivation can be challenging, especially when we're struggling. Start small - even tiny steps forward are progress. What's one small thing you could do today that would make you feel a little bit better? Remember, you don't have to feel motivated to take action; sometimes action creates motivation."
    }

    if (lowerMessage.includes("breathing") || lowerMessage.includes("breathe")) {
      return "Breathing exercises are wonderful for calming the nervous system. Try this 4-7-8 technique: Breathe in through your nose for 4 counts, hold for 7 counts, then exhale through your mouth for 8 counts. Repeat 3-4 times. This can help reduce anxiety and promote relaxation. How are you feeling as you try this?"
    }

    if (lowerMessage.includes("bad day") || lowerMessage.includes("terrible day")) {
      return "I'm sorry you're having a difficult day. Bad days are part of the human experience, and they don't define you or predict your future. You've gotten through 100% of your bad days so far - that's a pretty good track record. What's one small thing that might bring you a tiny bit of comfort right now?"
    }

    if (lowerMessage.includes("self-care") || lowerMessage.includes("care")) {
      return "Self-care is so important for mental health. Here are some gentle self-care ideas: 1) Take a warm bath or shower, 2) Listen to calming music, 3) Write in a journal, 4) Call a friend, 5) Go for a walk in nature, 6) Practice gratitude by listing 3 things you're thankful for. What kind of self-care feels most appealing to you right now?"
    }

    // Default supportive response
    return "Thank you for sharing that with me. I'm here to listen and support you. Your feelings are valid, and it takes courage to reach out. Can you tell me more about what you're experiencing? Sometimes talking through our thoughts and feelings can help us process them better."
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

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
        type: detectCrisis(inputValue) ? "crisis" : "normal",
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Companion</h1>
            <p className="text-gray-600">Your supportive AI companion is here to listen and help</p>
          </div>

          {/* Crisis Alert */}
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm text-red-800">
                    <strong>Crisis Support:</strong> If you're in immediate danger, call 911. For mental health crisis
                    support, call 988 or text HOME to 741741.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Get Help
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2 px-3 focus-ring bg-transparent"
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
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">MindEase AI</CardTitle>
                      <p className="text-sm text-gray-500">Always here to listen</p>
                    </div>
                    <div className="ml-auto">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              message.sender === "user"
                                ? "bg-blue-500"
                                : message.type === "crisis"
                                  ? "bg-red-100"
                                  : "bg-gray-100"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <User className="h-4 w-4 text-white" />
                            ) : message.type === "crisis" ? (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            ) : (
                              <Heart className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.sender === "user"
                                ? "bg-blue-500 text-white"
                                : message.type === "crisis"
                                  ? "bg-red-50 border border-red-200 text-red-900"
                                  : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender === "user" ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Heart className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="bg-gray-100 rounded-lg px-4 py-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Share what's on your mind..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 focus-ring"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="focus-ring"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This AI companion provides support but is not a replacement for professional mental health care.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
