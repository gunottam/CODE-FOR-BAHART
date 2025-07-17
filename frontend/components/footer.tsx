"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export default function Footer() {
  const [open, setOpen] = useState(false)
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
              <span className="text-gray-500 cursor-not-allowed select-none opacity-60">Help</span>
              <span className="text-gray-500 cursor-not-allowed select-none opacity-60">Privacy</span>
              <span className="text-gray-500 cursor-not-allowed select-none opacity-60">Terms</span>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button className="text-gray-300 hover:text-white transition-colors focus:outline-none" onClick={() => setOpen(true)}>
                    Contact
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border border-gray-700 text-white">
                  <DialogTitle className="mb-2">Contact Us</DialogTitle>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Phone Number:</span> <span className="text-gray-300">+91 9415911058</span>
                    </div>
                    <div>
                      <span className="font-semibold">Email ID:</span> {" "}
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=rawatsatyam058@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-300"
                      >
                        rawatsatyam058@gmail.com
                      </a>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-400">
              © 2025 MindEase. All rights reserved.
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
