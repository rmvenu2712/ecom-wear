"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 */}
        <div className="relative">
          <div
            className={`text-[150px] sm:text-[200px] font-black bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none transition-all duration-1000 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            404
          </div>

          {/* Floating Elements */}
          <div
            className={`absolute top-0 left-1/4 w-12 h-12 bg-blue-400 rounded-full blur-xl opacity-60 transition-all duration-1000 ${
              mounted ? "animate-bounce" : ""
            }`}
            style={{ animationDelay: "0s", animationDuration: "2s" }}
          />
          <div
            className={`absolute top-20 right-1/4 w-16 h-16 bg-purple-400 rounded-full blur-xl opacity-60 transition-all duration-1000 ${
              mounted ? "animate-bounce" : ""
            }`}
            style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
          />
          <div
            className={`absolute bottom-10 left-1/3 w-10 h-10 bg-pink-400 rounded-full blur-xl opacity-60 transition-all duration-1000 ${
              mounted ? "animate-bounce" : ""
            }`}
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          />
        </div>

        {/* Message */}
        <div
          className={`space-y-4 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Oops! Page Not Found</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for seems to have wandered off. Let's get you back on track!
          </p>
        </div>

        {/* Animated Icon */}
        <div
          className={`transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full animate-pulse">
            <ShoppingBag className="w-16 h-16 text-purple-600" />
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link href="/">
            <Button
              size="lg"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/categories/all">
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <Search className="w-5 h-5" />
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Decorative Text */}
        <div
          className={`text-sm text-gray-500 transition-all duration-700 delay-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>Error Code: 404 | Page Not Found</p>
        </div>
      </div>
    </div>
  )
}
