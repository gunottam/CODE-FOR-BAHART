import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import CrisisSupport from "@/components/crisis-support"
import UserFeedback from "@/components/user-feedback"
import Stars from "@/components/stars"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stars effect for dark mode */}
      <Stars />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        <Header />
        <main className="fade-in w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Features />
          <UserFeedback />
          <CrisisSupport />
        </main>

        {/* Full-size Detailed Footer */}
        <footer className="w-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 text-white">
          <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Main Footer Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Company Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold gradient-text">MindEase</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Your trusted companion for mental health and wellness. We provide secure, supportive tools for journaling, mood tracking, and AI-powered wellness support.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors hover-glow">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors hover-glow">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors hover-glow">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="/journal" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Journal
                      </a>
                    </li>
                    <li>
                      <a href="/chatbot" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        AI Support
                      </a>
                    </li>
                    <li>
                      <a href="/resources" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Resources
                      </a>
                    </li>
                    <li>
                      <a href="/features" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Features
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Support</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/help" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="/feedback" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Feedback
                      </a>
                    </li>
                    <li>
                      <a href="/crisis" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Crisis Support
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Legal</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="/cookies" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a href="/accessibility" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Accessibility
                      </a>
                    </li>
                    <li>
                      <a href="/security" className="text-gray-300 hover:text-white transition-colors text-sm hover-glow">
                        Security
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-800 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-gray-400 text-sm">
                    © 2024 MindEase. All rights reserved. | Made with ❤️ for mental health
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="text-gray-400">HIPAA Compliant</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">SSL Secured</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
