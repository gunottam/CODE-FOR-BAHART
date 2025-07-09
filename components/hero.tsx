import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
            <Heart className="mr-2 h-4 w-4" />
            Your mental health matters
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Find peace in your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              daily journey
            </span>
          </h1>

          {/* Hero Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            MindEase is your compassionate companion for mental wellness. Track your emotions, journal your thoughts,
            and get AI-powered support whenever you need it.
          </p>

          {/* Hero Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto focus-ring">
              <Link href="/journal">
                Start Journaling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto focus-ring bg-transparent" asChild>
              <Link href="/chatbot">Try AI Support</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="text-sm font-semibold text-gray-900">Private & Secure</h3>
              <p className="text-sm text-gray-600">Your data is encrypted and protected</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="text-sm font-semibold text-gray-900">Trusted by 10k+</h3>
              <p className="text-sm text-gray-600">Users improving their mental health</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="text-sm font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">AI companion always available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[800px] w-[800px] rounded-full bg-gradient-to-br from-blue-100 to-green-100 opacity-20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
