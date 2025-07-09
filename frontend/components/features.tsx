import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageCircle, BarChart3, Heart, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Daily Journaling",
    description:
      "Express your thoughts and feelings in a safe, private space with rich text editing and mood tracking.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: MessageCircle,
    title: "AI Companion",
    description:
      "Get instant support and guidance from our empathetic AI chatbot trained in mental health best practices.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: BarChart3,
    title: "Mood Analytics",
    description: "Visualize your emotional patterns and track your progress with insightful charts and trends.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Heart,
    title: "Wellness Resources",
    description: "Access curated mental health resources, guided meditations, and self-care techniques.",
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your mental health data is encrypted, secure, and never shared. You have complete control.",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  {
    icon: Zap,
    title: "Crisis Support",
    description: "Immediate access to crisis resources and professional helplines when you need them most.",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export default function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for mental wellness
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive tools designed with empathy and backed by mental health research
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
