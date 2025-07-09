"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login Attempt:", formData)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        alert(data.message || "Login successful ✅")
        window.location.href = "/dashboard"
      } else {
        alert(data.message || "Login failed ❌")
      }
    } catch (err) {
      console.error("Login error:", err)
      alert("Something went wrong ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 focus-ring rounded-lg">
            <Heart className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">MindEase</span>
          </Link>
          <p className="text-gray-600 mt-2">Welcome back to your wellness journey</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your mental health companion</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="focus-ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="focus-ring pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-ring rounded"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 focus-ring rounded">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full focus-ring">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-800 focus-ring rounded">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Your privacy and security are our top priority. All data is encrypted and protected.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Support */}
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-red-800 mb-2">
              <strong>Need immediate help?</strong>
            </p>
            <p className="text-xs text-red-700">Crisis support is available 24/7: Call 988 or text HOME to 741741</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}