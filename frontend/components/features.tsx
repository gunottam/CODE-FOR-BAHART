import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, MessageSquare, BarChart3, Shield, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Support",
    description: "Get personalized mental health guidance from our advanced AI companion, available 24/7 to help you through difficult moments.",
  },
  {
    icon: BookOpen,
    title: "Digital Journaling",
    description: "Track your thoughts, emotions, and progress with our intuitive journaling system designed for mental wellness.",
  },
  {
    icon: BarChart3,
    title: "Mood Analytics",
    description: "Visualize your emotional patterns and identify triggers with comprehensive mood tracking and analytics.",
  },
  {
    icon: MessageSquare,
    title: "Crisis Resources",
    description: "Immediate access to crisis support resources and emergency contact information when you need it most.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your mental health data is protected with enterprise-grade encryption and strict privacy controls.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with others on similar wellness journeys in our supportive and moderated community spaces.",
  },
]

export default function Features() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need for your mental wellness journey
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive tools and resources designed by mental health professionals to support your well-being.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="glassmorphism hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group scale-hover">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg glassmorphism border border-gray-200/50 dark:border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to start your wellness journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of users who have transformed their mental health with MindEase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/journal"
                className="btn-futuristic inline-flex items-center justify-center"
              >
                Start Journaling
              </a>
              <a
                href="/chatbot"
                className="btn-glass-light dark:btn-glass inline-flex items-center justify-center"
              >
                Try AI Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
