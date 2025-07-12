import Link from "next/link"
import { Heart, Shield, Users, Zap, AlertTriangle } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Journal", href: "/journal" },
    { name: "AI Support", href: "/chatbot" },
    { name: "Resources", href: "/resources" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-blue-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-blue-900 dark:text-gray-100">MindEase</span>
            </Link>
            <p className="text-blue-700 dark:text-gray-300 mb-6 max-w-sm">
              Professional mental health support powered by AI. Your journey to wellness starts here.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-gray-100 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-700 hover:text-blue-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-gray-100 mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-700 hover:text-blue-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-gray-100 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-700 hover:text-blue-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-blue-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-blue-700 dark:text-gray-300">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with care for mental wellness</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-blue-700 dark:text-gray-300">
              <span>© 2024 MindEase. All rights reserved.</span>
            </div>
          </div>
        </div>

        {/* Crisis support reminder */}
        <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-center space-x-2 text-sm text-red-800 dark:text-red-200">
            <AlertTriangle className="h-4 w-4" />
            <span>
              <strong>Crisis Support:</strong> If you're in crisis, call{" "}
              <a href="tel:988" className="font-semibold underline">988</a> or text HOME to 741741
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
