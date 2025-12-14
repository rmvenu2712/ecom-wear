"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useMode } from "@/lib/mode-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import Image from "next/image"
import { Logo } from "@/components/Logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { mode, setMode } = useMode()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/account")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getModeConfig = () => {
    if (mode === "men") {
      return {
        image: "/men-formal-wear.jpg",
        gradient: "from-blue-600 to-blue-800",
        accent: "bg-blue-600 hover:bg-blue-700",
        text: "text-blue-600",
      }
    }
    if (mode === "women") {
      return {
        image: "/women-fashion-banner.jpg",
        gradient: "from-pink-500 to-pink-700",
        accent: "bg-pink-500 hover:bg-pink-600",
        text: "text-pink-600",
      }
    }
    return {
      image: "/kids-fashion-banner.jpg",
      gradient: "from-amber-500 to-amber-700",
      accent: "bg-amber-500 hover:bg-amber-600",
      text: "text-amber-600",
    }
  }

  const config = getModeConfig()

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image and Mode Switcher */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image src={config.image || "/placeholder.svg"} alt="Fashion" fill className="object-cover" priority />
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-30`} />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Welcome to Fashion Store</h2>
          <p className="text-lg mb-8 text-center opacity-90">Shop the latest trends in {mode}'s fashion</p>

          {/* Mode Switcher */}
          <div className="flex gap-3 bg-white/20 backdrop-blur-sm p-2 rounded-full">
            {[
              { value: "men" as const, label: "Men" },
              { value: "women" as const, label: "Women" },
              { value: "kids" as const, label: "Kids" },
            ].map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${mode === m.value ? "bg-white text-gray-900 shadow-lg" : "text-white hover:bg-white/10"
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">

              <div className="relative bottom-4 w-full flex items-center justify-center">

                <div className="h-24 relative w-24 ">
<div
  className={`absolute left-1/2  w-[70px] h-[70px] -bottom-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${config.gradient} opacity-60 blur-sm`}
 />

              <Link href={'/'}> <Logo /></Link>  
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue shopping</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-12 h-12 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className={`${config.text} hover:underline font-medium`}>
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={`w-full h-12 ${config.accent} text-white font-semibold`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className={`${config.text} hover:underline font-semibold`}>
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
