"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
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

    // Emotional states
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worried")) {
      const responses = [
        "I hear that you're feeling anxious. That's a very common experience, and it's brave of you to reach out. Try this: Take a slow, deep breath in for 4 counts, hold for 4, then exhale for 6. This can help activate your body's relaxation response. What's making you feel anxious right now?",
        "Anxiety can feel overwhelming, but you're not alone in this. Your body might be in fight-or-flight mode. Try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment.",
        "It's completely normal to feel anxious sometimes. Your nervous system is trying to protect you. Remember that anxiety is temporary, even when it doesn't feel like it. What would feel most helpful to you right now - talking through what's on your mind, or learning some calming techniques?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("stress") || lowerMessage.includes("stressed") || lowerMessage.includes("overwhelmed")) {
      const responses = [
        "Stress can feel overwhelming, but you're taking a positive step by talking about it. Here are some quick stress-relief techniques: 1) Try the 5-4-3-2-1 grounding technique (5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste), 2) Take a short walk, 3) Practice deep breathing. What's your biggest source of stress right now?",
        "When stress builds up, it can feel like you're carrying the weight of the world. Remember that you don't have to solve everything at once. What's one small thing you could do right now that would help you feel even slightly better? Sometimes just acknowledging that you're stressed is the first step to managing it.",
        "Stress is your body's way of responding to challenges, but too much can be exhausting. Try this: Set a timer for 5 minutes and do something that brings you joy - listen to music, stretch, or just sit quietly. You deserve these moments of relief. What's causing you the most stress today?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down") || lowerMessage.includes("blue")) {
      const responses = [
        "I'm sorry you're feeling this way. Your feelings are valid, and it's okay to not be okay sometimes. Remember that difficult emotions are temporary, even when they don't feel like it. Have you been able to do any small self-care activities today, like drinking water, getting some sunlight, or connecting with someone you care about?",
        "It sounds like you're going through a really tough time. Depression can make everything feel heavy and hopeless, but you're showing incredible strength by reaching out. Sometimes the smallest acts of self-care can make a difference - even just getting out of bed or taking a shower. What's one tiny thing that might help you feel a little better?",
        "Your sadness is real and it matters. You don't have to pretend to be okay when you're not. It's okay to feel down, and it's also okay to ask for help. Have you considered talking to a mental health professional? Sometimes having someone to talk to can make a world of difference."
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("motivation") || lowerMessage.includes("motivated") || lowerMessage.includes("lazy") || lowerMessage.includes("procrastinate")) {
      const responses = [
        "Finding motivation can be challenging, especially when we're struggling. Start small - even tiny steps forward are progress. What's one small thing you could do today that would make you feel a little bit better? Remember, you don't have to feel motivated to take action; sometimes action creates motivation.",
        "Motivation often follows action, not the other way around. You don't need to feel inspired to start - just begin with something tiny. What's the smallest possible step you could take toward what you want to accomplish? Even 5 minutes of effort counts as progress.",
        "It's completely normal to struggle with motivation, especially when you're dealing with difficult emotions. Instead of waiting to feel motivated, try the 'just 5 minutes' rule - commit to doing something for just 5 minutes. Often, once you start, you'll want to continue. What would you like to work on?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("breathing") || lowerMessage.includes("breathe") || lowerMessage.includes("calm")) {
      const responses = [
        "Breathing exercises are wonderful for calming the nervous system. Try this 4-7-8 technique: Breathe in through your nose for 4 counts, hold for 7 counts, then exhale through your mouth for 8 counts. Repeat 3-4 times. This can help reduce anxiety and promote relaxation. How are you feeling as you try this?",
        "Your breath is always with you as a tool for calm. Try this simple technique: Place one hand on your chest and one on your belly. Take slow, deep breaths, feeling your belly rise and fall. Count to 4 as you inhale, then 6 as you exhale. This activates your body's natural relaxation response.",
        "When you're feeling overwhelmed, your breath can be your anchor. Try this: Inhale deeply and imagine you're breathing in peace and calm. As you exhale, imagine releasing tension and worry. Repeat this 5 times. Notice how your body feels different. What do you notice?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("bad day") || lowerMessage.includes("terrible day") || lowerMessage.includes("awful day")) {
      const responses = [
        "I'm sorry you're having a difficult day. Bad days are part of the human experience, and they don't define you or predict your future. You've gotten through 100% of your bad days so far - that's a pretty good track record. What's one small thing that might bring you a tiny bit of comfort right now?",
        "Some days just feel like everything is going wrong, and that's really hard. Remember that tomorrow is a new day with new possibilities. You don't have to figure everything out today. What would help you get through the rest of this day? Sometimes just surviving a bad day is enough.",
        "Bad days can feel endless, but they do pass. You're doing the best you can with what you have right now, and that's enough. Is there anything that usually helps you feel even slightly better when you're having a rough day? Even small comforts matter."
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("self-care") || lowerMessage.includes("care") || lowerMessage.includes("tired") || lowerMessage.includes("exhausted")) {
      const responses = [
        "Self-care is so important for mental health. Here are some gentle self-care ideas: 1) Take a warm bath or shower, 2) Listen to calming music, 3) Write in a journal, 4) Call a friend, 5) Go for a walk in nature, 6) Practice gratitude by listing 3 things you're thankful for. What kind of self-care feels most appealing to you right now?",
        "Taking care of yourself isn't selfish - it's necessary. When you're feeling depleted, even small acts of self-care can make a difference. Try asking yourself: What do I need right now? Sometimes it's rest, sometimes it's movement, sometimes it's connection. What feels right for you?",
        "You deserve to be taken care of, especially when you're feeling tired or overwhelmed. Self-care can be as simple as drinking a glass of water, stretching your body, or giving yourself permission to rest. What would feel most nourishing to you right now?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // More general emotional responses
    if (lowerMessage.includes("feel") || lowerMessage.includes("feeling")) {
      const responses = [
        "I'm listening, and I want to understand what you're going through. Can you tell me more about what you're feeling? Sometimes putting our emotions into words can help us process them better.",
        "Your feelings are important and valid. It takes courage to acknowledge and share what you're experiencing. What's been on your mind lately? I'm here to listen without judgment.",
        "Thank you for sharing that with me. Emotions can be complex and sometimes confusing. What's been the most challenging part of what you're feeling? Sometimes talking through our thoughts can bring clarity."
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("need help")) {
      const responses = [
        "I'm here to help you. You're not alone in this, and reaching out is a sign of strength. What kind of support would be most helpful for you right now? Sometimes just talking can make a difference.",
        "Asking for help is one of the bravest things you can do. I'm listening, and I want to support you however I can. What's been the most difficult part of what you're going through?",
        "You deserve support, and I'm glad you're reaching out. What would feel most helpful to you right now - talking through what's on your mind, learning some coping strategies, or just having someone listen?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("alone") || lowerMessage.includes("lonely") || lowerMessage.includes("isolated")) {
      const responses = [
        "Feeling alone can be incredibly painful, even when you're not physically alone. Your feelings of loneliness are valid, and many people experience this. What would help you feel more connected right now? Sometimes reaching out to someone you trust can make a difference.",
        "Loneliness can feel overwhelming, but you're not truly alone. There are people who care about you and want to support you. Have you considered reaching out to a friend, family member, or mental health professional? You don't have to go through this by yourself.",
        "It's okay to feel lonely - it's a very human experience. Sometimes the hardest part is reaching out when we need connection. What's one small step you could take to connect with someone today? Even a brief conversation can help."
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Greetings and general conversation
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      const responses = [
        "Hello! I'm here to listen and support you. How are you feeling today? Sometimes just checking in with ourselves can be a helpful practice.",
        "Hi there! I'm glad you're here. How has your day been so far? I'm ready to listen to whatever you'd like to share.",
        "Hey! I'm your AI companion, and I'm here for you. What's on your mind today? Sometimes talking through our thoughts can help us feel better."
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // More varied default responses
    const defaultResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. Your feelings are valid, and it takes courage to reach out. Can you tell me more about what you're experiencing? Sometimes talking through our thoughts and feelings can help us process them better.",
      "I hear you, and I want to understand what you're going through. It's okay to not have all the answers right now. What's been the most challenging part of what you're experiencing? I'm here to listen without judgment.",
      "Thank you for trusting me with what you're going through. Your experiences matter, and you don't have to face them alone. What would be most helpful for you right now - talking through your thoughts, learning some coping strategies, or just having someone listen?",
      "I'm listening, and I care about what you're experiencing. Sometimes the hardest part is putting our feelings into words. Take your time, and know that I'm here to support you however I can. What's been on your mind lately?",
      "Your feelings are important, and I want to understand what you're going through. It's brave of you to reach out and share what's on your mind. What would help you feel most supported right now? Sometimes just knowing someone is listening can make a difference."
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
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
