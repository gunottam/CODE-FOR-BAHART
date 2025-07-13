import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Users, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-pink-500/15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center rounded-full glassmorphism px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200/50 dark:border-white/20">
              <Heart className="mr-2 h-4 w-4 text-pink-400" />
              Professional Mental Health Support
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            Your Journey to
            <span className="block gradient-text">
              Mental Wellness
            </span>
            Starts Here
          </h1>

          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 sm:text-xl max-w-3xl mx-auto">
            Experience professional mental health support with AI-powered tools,
            personalized journaling, and comprehensive resources designed for your well-being.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/journal">
              <Button size="lg" className="btn-futuristic group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/chatbot">
              <Button variant="outline" size="lg" className="btn-glass-light dark:btn-glass">
                Try AI Support
              </Button>
            </Link>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center group">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg glassmorphism border border-gray-200/50 dark:border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Compassionate Care
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Professional support designed with empathy and understanding
            </p>
          </div>

          <div className="text-center group">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg glassmorphism border border-gray-200/50 dark:border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              AI-Powered Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Advanced technology for personalized mental health guidance
            </p>
          </div>

          <div className="text-center group">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg glassmorphism border border-gray-200/50 dark:border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Privacy First
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your data is protected with enterprise-grade security
            </p>
          </div>

          <div className="text-center group">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg glassmorphism border border-gray-200/50 dark:border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Community Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Connect with others on similar wellness journeys
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
