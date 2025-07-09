import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, AlertTriangle } from "lucide-react"

export default function CrisisSupport() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-4xl border-red-200 bg-red-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-900">Need immediate help?</CardTitle>
            <p className="text-red-700">
              If you're in crisis or having thoughts of self-harm, please reach out for immediate support
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3 rounded-lg bg-white p-4">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold text-gray-900">Crisis Hotline</div>
                  <div className="text-sm text-gray-600">988 - Available 24/7</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 rounded-lg bg-white p-4">
                <MessageSquare className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold text-gray-900">Crisis Text Line</div>
                  <div className="text-sm text-gray-600">Text HOME to 741741</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                View All Crisis Resources
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
