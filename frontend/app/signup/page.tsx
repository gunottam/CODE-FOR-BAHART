"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  })

  const validatePassword = (password: string) => {
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*#?&^()_+=-]/.test(password),
    })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌")
      return
    }

    const allPassed = Object.values(passwordChecks).every(Boolean)
    if (!allPassed) {
      alert("Password does not meet all security requirements ❌")
      return
    }

    console.log("Signup Attempt:", formData)

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        alert(data.message || "Signup successful ✅")
        window.location.href = "/login"
      } else {
        alert(data.message || "Signup failed ❌")
      }
    } catch (err) {
      console.error("Signup error:", err)
      alert("Something went wrong ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">MindEase</span>
          </Link>
          <p className="text-gray-600 mt-2">Start your wellness journey</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Create your account to access your mental health companion
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData((prev) => ({ ...prev, password: value }))
                      validatePassword(value)
                    }}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password rules */}
                <div className="text-sm space-y-1 mt-2">
                  <p className={passwordChecks.length ? "text-green-600" : "text-red-600"}>
                    • At least 8 characters
                  </p>
                  <p className={passwordChecks.uppercase ? "text-green-600" : "text-red-600"}>
                    • One uppercase letter (A-Z)
                  </p>
                  <p className={passwordChecks.lowercase ? "text-green-600" : "text-red-600"}>
                    • One lowercase letter (a-z)
                  </p>
                  <p className={passwordChecks.number ? "text-green-600" : "text-red-600"}>
                    • One number (0-9)
                  </p>
                  <p className={passwordChecks.specialChar ? "text-green-600" : "text-red-600"}>
                    • One special character (@$!%*#?&)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-800">
                  Sign in
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

        <Card className="mt-6 border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-red-800 mb-2">
              <strong>Need immediate help?</strong>
            </p>
            <p className="text-xs text-red-700">
              Crisis support is available 24/7: Call 988 or text HOME to 741741
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
