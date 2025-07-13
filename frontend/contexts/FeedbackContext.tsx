"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Feedback {
  id: string
  name: string
  email: string
  message: string
  rating: number
  date: string
  approved: boolean
  likes: number
  liked: boolean
}

interface FeedbackContextType {
  feedbacks: Feedback[]
  addFeedback: (feedback: Omit<Feedback, 'id' | 'date' | 'approved' | 'likes' | 'liked'>) => void
  getTopFeedbacks: (count?: number) => Feedback[]
  likeFeedback: (feedbackId: string) => void
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined)

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  // Load feedbacks from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mindEaseFeedbacks')
      if (stored) {
        setFeedbacks(JSON.parse(stored))
      }
    }
  }, [])

  // Save feedbacks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mindEaseFeedbacks', JSON.stringify(feedbacks))
    }
  }, [feedbacks])

  const addFeedback = (feedback: Omit<Feedback, 'id' | 'date' | 'approved' | 'likes' | 'liked'>) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      approved: true, // Auto-approve for demo purposes
      likes: 0,
      liked: false
    }
    setFeedbacks(prev => [newFeedback, ...prev])
  }

  const likeFeedback = (feedbackId: string) => {
    setFeedbacks(prev => prev.map(feedback => {
      if (feedback.id === feedbackId) {
        return {
          ...feedback,
          likes: feedback.liked ? feedback.likes - 1 : feedback.likes + 1,
          liked: !feedback.liked
        }
      }
      return feedback
    }))
  }

  const getTopFeedbacks = (count: number = 4) => {
    return feedbacks
      .filter(feedback => feedback.approved)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count)
  }

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, getTopFeedbacks, likeFeedback }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export function useFeedback() {
  const context = useContext(FeedbackContext)
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider')
  }
  return context
} 