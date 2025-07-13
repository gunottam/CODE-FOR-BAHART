"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Eye, EyeOff, Sparkles, Zap, Shield } from "lucide-react"
import Header from "@/components/header"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:2001/api/auth/login", {
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
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
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
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-8 fade-in">
        <Card className="glassmorphism border-gray-200/50 dark:border-white/20 w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Heart className="h-8 w-8 text-pink-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Welcome back! Please sign in to your MindEase account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/50 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="bg-white/50 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pr-10"
                    placeholder="Your password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 focus:outline-none"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Checkbox
                    checked={formData.rememberMe}
                    onCheckedChange={checked => setFormData({ ...formData, rememberMe: !!checked })}
                    id="rememberMe"
                  />
                  Remember me
                </label>
                <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Create account
                </Link>
              </div>
              <Button type="submit" className="w-full btn-futuristic">
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              <Shield className="inline h-4 w-4 mr-1 text-blue-400" />
              Your data is encrypted and secure.
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}