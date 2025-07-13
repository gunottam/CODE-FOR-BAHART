import { AlertTriangle, Phone, MessageCircle, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const crisisResources = [
  {
    title: "National Suicide Prevention Lifeline",
    description: "24/7 free and confidential support for people in distress",
    phone: "988",
    available: "24/7",
    icon: Phone,
  },
  {
    title: "Crisis Text Line",
    description: "Text HOME to connect with a crisis counselor",
    phone: "Text HOME to 741741",
    available: "24/7",
    icon: MessageCircle,
  },
  {
    title: "Emergency Services",
    description: "If you're in immediate danger, call emergency services",
    phone: "911",
    available: "24/7",
    icon: AlertTriangle,
  },
]

export default function CrisisSupport() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center rounded-full glassmorphism px-4 py-2 text-sm font-medium text-red-700 dark:text-red-200 border border-red-300/50 dark:border-red-400/30">
              <Heart className="mr-2 h-4 w-4" />
              Crisis Support Available
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            You're not alone. Help is available 24/7.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            If you're experiencing a mental health crisis, these resources are here to support you immediately.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {crisisResources.map((resource, index) => (
            <Card key={index} className="glassmorphism border-red-300/50 dark:border-red-400/30 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 scale-hover">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg glassmorphism border border-red-300/50 dark:border-red-400/30">
                  <resource.icon className="h-6 w-6 text-red-500 dark:text-red-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">
                  {resource.description}
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Contact:</span>
                    <span className="text-lg font-bold text-red-500 dark:text-red-400">{resource.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Available:</span>
                    <span className="text-sm text-green-500 dark:text-green-400 font-medium">{resource.available}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional support information */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Remember: Your life has value
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you're struggling, reaching out for help is a sign of strength, not weakness.
              These resources are staffed by trained professionals who want to help you.
            </p>
            <div className="glassmorphism rounded-lg p-6 border border-gray-200/50 dark:border-white/20">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                What to expect when you call:
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left max-w-md mx-auto">
                <li>• Confidential and non-judgmental support</li>
                <li>• Trained crisis counselors</li>
                <li>• Immediate assistance and resources</li>
                <li>• Help developing a safety plan if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
