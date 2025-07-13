import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white border-t border-gray-800">
      <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and tagline */}
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-white">MindEase</span>
              <span className="text-xs text-gray-400">• Mental Health Support</span>
            </div>

            {/* Quick links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                Help
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-400">
              © 2024 MindEase. All rights reserved.
            </div>
          </div>

          {/* Crisis support - small */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-center">
              <span className="text-xs text-gray-400">
                <strong>Crisis Support:</strong> Call{" "}
                <a href="tel:988" className="text-red-400 underline">988</a> or text HOME to 741741
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
