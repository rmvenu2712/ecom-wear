"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { Mode } from "@/lib/mode-context"

type Banner = {
  id: number
  title: string
  subtitle: string
  cta: string
  link: string
  image: string
}

const menBanners: Banner[] = [
  {
    id: 1,
    title: "New Season Essentials",
    subtitle: "Upgrade your wardrobe with premium menswear",
    cta: "Shop Men's Collection",
    link: "/categories/all",
    image: "/men-fashion-banner.jpg",
  },
  {
    id: 2,
    title: "Formal Excellence",
    subtitle: "Sharp suits and elegant shirts for every occasion",
    cta: "Explore Formal Wear",
    link: "/categories/shirts",
    image: "/men-formal-wear.jpg",
  },
  {
    id: 3,
    title: "Casual Comfort",
    subtitle: "Relaxed fits that never compromise on style",
    cta: "Browse Casual",
    link: "/categories/jeans",
    image: "/men-casual-wear.jpg",
  },
]

const womenBanners: Banner[] = [
  {
    id: 1,
    title: "Feminine & Fabulous",
    subtitle: "Discover the latest trends in women's fashion",
    cta: "Shop Women's Collection",
    link: "/categories/all",
    image: "/women-fashion-banner.jpg",
  },
  {
    id: 2,
    title: "Elegant Dresses",
    subtitle: "From casual day dresses to evening gowns",
    cta: "Explore Dresses",
    link: "/categories/dresses",
    image: "/women-elegant-dresses.jpg",
  },
  {
    id: 3,
    title: "Summer Collection",
    subtitle: "Light, breezy styles perfect for warm weather",
    cta: "Shop Summer",
    link: "/categories/tops",
    image: "/women-summer-fashion.jpg",
  },
]

const kidsBanners: Banner[] = [
  {
    id: 1,
    title: "Fun Fashion for Kids!",
    subtitle: "Colorful, comfortable styles they'll love",
    cta: "Shop Kids Collection",
    link: "/categories/all",
    image: "/kids-fashion-banner.jpg",
  },
  {
    id: 2,
    title: "Playtime Ready",
    subtitle: "Durable clothes made for adventure",
    cta: "Browse Playwear",
    link: "/categories/t-shirts",
    image: "/kids-play-clothes.jpg",
  },
  {
    id: 3,
    title: "Back to School",
    subtitle: "Fresh styles for a new school year",
    cta: "School Collection",
    link: "/categories/accessories",
    image: "/kids-school-fashion.jpg",
  },
]

export function BannerSlider({ mode }: { mode: Mode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const banners = mode === "men" ? menBanners : mode === "women" ? womenBanners : kidsBanners

  useEffect(() => {
    setCurrentIndex(0)
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [mode])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, banners.length])

  const handleNext = () => {
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % banners.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const currentBanner = banners[currentIndex]

  const getModeStyles = () => {
    if (mode === "men") return { bg: "from-blue-600/90 to-blue-800/90", button: "bg-blue-600 hover:bg-blue-700" }
    if (mode === "women") return { bg: "from-pink-500/90 to-pink-700/90", button: "bg-pink-500 hover:bg-pink-600" }
    return { bg: "from-amber-500/90 to-amber-700/90", button: "bg-amber-500 hover:bg-amber-600" }
  }

  const styles = getModeStyles()

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-900 sm:h-[550px]">
      <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
        <Image
          src={currentBanner.image || "/placeholder.svg"}
          alt={currentBanner.title}
          fill
          className="object-cover object-top"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-r`} />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6">
        <h2
          className={`mb-4 text-4xl font-bold transition-all duration-500 sm:text-5xl lg:text-6xl ${
            isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          } ${mode === "kids" ? "kids-bounce" : ""}`}
        >
          {currentBanner.title}
        </h2>
        <p
          className={`mb-8 max-w-2xl text-lg transition-all duration-500 delay-100 sm:text-xl ${
            isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {currentBanner.subtitle}
        </p>
        <Link href={currentBanner.link}>
          <Button
            size="lg"
            className={`${styles.button} text-white transition-all duration-500 delay-200 hover:scale-105 ${
              isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            {currentBanner.cta}
          </Button>
        </Link>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-6 w-6 text-gray-900" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
        aria-label="Next banner"
      >
        <ChevronRight className="h-6 w-6 text-gray-900" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true)
              setCurrentIndex(index)
              setTimeout(() => setIsAnimating(false), 500)
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
