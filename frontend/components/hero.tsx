import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Users, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-bg py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100/50 dark:bg-gray-800/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-200/30 dark:bg-gray-700/20 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-gray-800 dark:text-gray-200">
              <Heart className="mr-2 h-4 w-4" />
              Professional Mental Health Support
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl lg:text-7xl dark:text-gray-100">
            Your Journey to
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
              Mental Wellness
            </span>
            Starts Here
          </h1>

          <p className="mb-8 text-lg text-blue-700 dark:text-gray-300 sm:text-xl max-w-3xl mx-auto">
            Experience professional mental health support with AI-powered tools, 
            personalized journaling, and comprehensive resources designed for your well-being.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="lg">
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-gray-800">
              <Heart className="h-6 w-6 text-blue-600 dark:text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-gray-100">
              Compassionate Care
            </h3>
            <p className="text-sm text-blue-700 dark:text-gray-300">
              Professional support designed with empathy and understanding
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-gray-800">
              <Zap className="h-6 w-6 text-blue-600 dark:text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-gray-100">
              AI-Powered Insights
            </h3>
            <p className="text-sm text-blue-700 dark:text-gray-300">
              Advanced technology for personalized mental health guidance
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-gray-800">
              <Shield className="h-6 w-6 text-blue-600 dark:text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-gray-100">
              Privacy First
            </h3>
            <p className="text-sm text-blue-700 dark:text-gray-300">
              Your data is protected with enterprise-grade security
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-gray-800">
              <Users className="h-6 w-6 text-blue-600 dark:text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-gray-100">
              Community Support
            </h3>
            <p className="text-sm text-blue-700 dark:text-gray-300">
              Connect with others on similar wellness journeys
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
