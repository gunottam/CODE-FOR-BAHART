"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Heart, LogOut, User } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-700 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-blue-900 dark:text-gray-100">MindEase</span>
          </Link>
        </div>

        {/* Desktop Navigation - Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-1">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-800 font-medium">
                Dashboard
              </Button>
            </Link>
            <Link href="/journal">
              <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-800 font-medium">
                Journal
              </Button>
            </Link>
            <Link href="/chatbot">
              <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-800 font-medium">
                AI Support
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-800 font-medium">
                Resources
              </Button>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-blue-700 hover:text-blue-900 hover:bg-blue-100 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-700"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user.firstName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/journal">Journal</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/chatbot">AI Support</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-blue-700 hover:text-blue-900 hover:bg-blue-100 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-blue-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="container py-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-blue-700 hover:text-blue-900 dark:text-gray-200 dark:hover:text-gray-100">
                  Dashboard
                </Button>
              </Link>
              <Link href="/journal" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-blue-700 hover:text-blue-900 dark:text-gray-200 dark:hover:text-gray-100">
                  Journal
                </Button>
              </Link>
              <Link href="/chatbot" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-blue-700 hover:text-blue-900 dark:text-gray-200 dark:hover:text-gray-100">
                  AI Support
                </Button>
              </Link>
              <Link href="/resources" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-blue-700 hover:text-blue-900 dark:text-gray-200 dark:hover:text-gray-100">
                  Resources
                </Button>
              </Link>
            </div>
            {user ? (
              <div className="flex flex-col space-y-2 pt-4 border-t border-blue-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 p-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 hover:text-red-700" 
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-4 border-t border-blue-200 dark:border-gray-700">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
