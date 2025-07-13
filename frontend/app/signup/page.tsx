"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff, Sparkles, UserPlus, CheckCircle, XCircle } from "lucide-react"

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
      const response = await fetch("http://localhost:2001/api/auth/signup", {
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Futuristic Logo */}
          <div className="text-center mb-8 group">
            <Link href="/" className="inline-flex items-center space-x-3 focus-ring rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:bg-white/10 backdrop-blur-sm">
              <div className="relative">
                <Heart className="h-10 w-10 text-pink-400 drop-shadow-lg" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                MindEase
              </span>
            </Link>
            <p className="text-gray-300 mt-3 text-lg font-light">Start your wellness journey</p>
          </div>

          {/* Glassmorphism Card */}
          <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-xl backdrop-saturate-150 transform transition-all duration-500 hover:scale-105 hover:shadow-pink-500/25">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
              <CardDescription className="text-gray-300">Join your mental health companion</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-white font-medium">First Name</Label>
                    <div className="relative group">
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-indigo-400 focus:ring-indigo-400/50 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-white font-medium">Last Name</Label>
                    <div className="relative group">
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-indigo-400 focus:ring-indigo-400/50 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-white font-medium">Email</Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-indigo-400 focus:ring-indigo-400/50 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-white font-medium">Password</Label>
                  <div className="relative group">
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
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-indigo-400 focus:ring-indigo-400/50 transition-all duration-300 backdrop-blur-sm pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                  </div>

                  {/* Password Strength Indicator */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 space-y-3">
                    <h4 className="text-sm font-medium text-white mb-3">Password Requirements</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {passwordChecks.length ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                        <span className={`text-sm ${passwordChecks.length ? 'text-green-300' : 'text-red-300'}`}>At least 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {passwordChecks.uppercase ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                        <span className={`text-sm ${passwordChecks.uppercase ? 'text-green-300' : 'text-red-300'}`}>One uppercase letter (A-Z)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {passwordChecks.lowercase ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                        <span className={`text-sm ${passwordChecks.lowercase ? 'text-green-300' : 'text-red-300'}`}>One lowercase letter (a-z)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {passwordChecks.number ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                        <span className={`text-sm ${passwordChecks.number ? 'text-green-300' : 'text-red-300'}`}>One number (0-9)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {passwordChecks.specialChar ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                        <span className={`text-sm ${passwordChecks.specialChar ? 'text-green-300' : 'text-red-300'}`}>One special character (@$!%*#?&)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
                  <div className="relative group">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                      }
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-indigo-400 focus:ring-indigo-400/50 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 focus:ring-2 focus:ring-pink-500/50"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-300">
                  Already have an account?{" "}
                  <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  Your privacy and security are our top priority. All data is encrypted and protected.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Crisis Support Card */}
          <Card className="mt-6 border-red-400/30 bg-red-500/10 backdrop-blur-xl backdrop-saturate-150">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-red-300 mb-2">
                <strong>Need immediate help?</strong>
              </p>
              <p className="text-xs text-red-200">Crisis support is available 24/7: Call 988 or text HOME to 741741</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
