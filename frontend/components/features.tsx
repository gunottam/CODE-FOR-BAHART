import { Brain, BookOpen, MessageSquare, BarChart3, Shield, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

export function Features() {
  return (
    <section className="py-20 lg:py-32 gradient-bg">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl dark:text-gray-100">
            Everything you need for your mental wellness journey
          </h2>
          <p className="mt-4 text-lg text-blue-700 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive tools and resources designed by mental health professionals to support your well-being.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="gradient-card professional-shadow border-blue-200 dark:border-gray-700 hover:professional-shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-gray-800 group-hover:bg-blue-200 dark:group-hover:bg-gray-700 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-gray-400" />
                </div>
                <CardTitle className="text-blue-900 dark:text-gray-100">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-700 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-gray-100 mb-4">
              Ready to start your wellness journey?
            </h3>
            <p className="text-blue-700 dark:text-gray-300 mb-6">
              Join thousands of users who have transformed their mental health with MindEase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Get Started Free
              </a>
              <a
                href="/resources"
                className="inline-flex items-center justify-center rounded-md border-2 border-blue-200 bg-white px-6 py-3 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 transition-all duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
