import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import CrisisSupport from "@/components/crisis-support"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CrisisSupport />
      </main>
      <Footer />
    </div>
  )
}
