import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "College Student",
    content:
      "MindEase helped me understand my anxiety patterns. The daily journaling and AI support made such a difference in my mental health journey.",
    rating: 5,
    avatar: "👩‍🎓",
  },
  {
    name: "David L.",
    role: "Working Professional",
    content:
      "The mood tracking feature is incredible. I can see how work stress affects me and the AI chatbot provides great coping strategies.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    name: "Maria R.",
    role: "Teacher",
    content:
      "As someone dealing with depression, having 24/7 support through the AI companion has been life-changing. It's like having a therapist in my pocket.",
    rating: 5,
    avatar: "👩‍🏫",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stories of healing and growth</h2>
          <p className="mt-4 text-lg text-gray-600">Real experiences from people who found support through MindEase</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">"{testimonial.content}"</blockquote>
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
