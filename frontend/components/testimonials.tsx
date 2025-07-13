import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content: "MindEase has been a game-changer for my mental health. The AI support is incredibly helpful, and the journaling feature helps me track my progress. I feel more in control of my emotions than ever before.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content: "As someone who struggles with anxiety, having 24/7 access to mental health support has been invaluable. The privacy features give me peace of mind, and the resources are comprehensive and professional.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Teacher",
    content: "The mood tracking and analytics have helped me understand my emotional patterns better. The crisis resources are easily accessible, and the overall design is calming and professional. Highly recommend!",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Healthcare Professional",
    content: "I recommend MindEase to my patients because it provides evidence-based mental health support in a user-friendly format. The AI companion is surprisingly empathetic and the journaling tools are excellent.",
    rating: 5,
  },
  {
    name: "Lisa Park",
    role: "Student",
    content: "Being a student can be stressful, and MindEase has been my go-to for mental wellness. The community support is amazing, and the personalized insights have helped me develop better coping strategies.",
    rating: 5,
  },
  {
    name: "Robert Wilson",
    role: "Retired Veteran",
    content: "After serving in the military, I needed a reliable mental health support system. MindEase provides that and more. The privacy controls are excellent, and the crisis resources are comprehensive.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 gradient-bg">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl dark:text-gray-100">
            Trusted by thousands of users worldwide
          </h2>
          <p className="mt-4 text-lg text-blue-700 dark:text-gray-300 max-w-3xl mx-auto">
            See how MindEase has transformed mental health journeys across different backgrounds and professions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-subtle hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-blue-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600 dark:text-gray-400">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-blue-900 dark:text-gray-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-900 dark:text-gray-100">50K+</div>
            <div className="text-sm text-blue-700 dark:text-gray-300">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-900 dark:text-gray-100">4.9/5</div>
            <div className="text-sm text-blue-700 dark:text-gray-300">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-900 dark:text-gray-100">24/7</div>
            <div className="text-sm text-blue-700 dark:text-gray-300">AI Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-900 dark:text-gray-100">99.9%</div>
            <div className="text-sm text-blue-700 dark:text-gray-300">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
