"use client"

import { useMode } from "@/lib/mode-context"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
import { ModeSwitcher } from "@/components/mode-switcher"
import { BannerSlider } from "@/components/banner-slider"
import Link from "next/link"
import { ArrowRight, TrendingUp, Star, Truck } from "lucide-react"

export default function HomePage() {
  const { mode } = useMode()

  const modeProducts = products.filter((p) => p.mode === mode).slice(0, 8)
  const featuredProducts = products.filter((p) => p.mode === mode && p.discount).slice(0, 4)

  const getModeStyles = () => {
    if (mode === "men") {
      return {
        text: "text-blue-600",
        border: "border-blue-200",
      }
    }
    if (mode === "women") {
      return {
        text: "text-pink-600",
        border: "border-pink-200",
      }
    }
    return {
      text: "text-amber-600",
      border: "border-amber-200",
    }
  }

  const styles = getModeStyles()

  return (
    <div className="bg-white">
      <ModeSwitcher />

      <section className="px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-700">
        <div className="mx-auto max-w-7xl">
          <BannerSlider mode={mode} />
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-gray-200 bg-white py-8 animate-in slide-in-from-bottom duration-500 delay-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Truck className={`h-8 w-8 ${styles.text}`} />
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className={`h-8 w-8 ${styles.text}`} />
              <div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-gray-600">Carefully curated collection</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className={`h-8 w-8 ${styles.text}`} />
              <div>
                <h3 className="font-semibold">Latest Trends</h3>
                <p className="text-sm text-gray-600">Updated weekly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-12 animate-in fade-in duration-700 delay-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">Hot Deals</h2>
            <Link
              href="/categories/sale"
              className={`flex items-center gap-1 text-sm font-medium ${styles.text} hover:underline`}
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section
        className={`border-y ${styles.border} bg-gradient-to-r from-gray-50 to-white py-16 animate-in zoom-in duration-500 delay-700`}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className={`mb-4 text-3xl font-bold ${mode === "kids" ? "kids-wiggle" : ""}`}>
            {mode === "men" && "Shop by Category"}
            {mode === "women" && "Explore Collections"}
            {mode === "kids" && "Find Your Favorites!"}
          </h2>
          <p className="mb-8 text-gray-600">Browse our carefully curated selection</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mode === "men" && (
              <>
                <Link
                  href="/categories/shirts"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-600 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Shirts</h3>
                </Link>
                <Link
                  href="/categories/jeans"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-600 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Jeans</h3>
                </Link>
                <Link
                  href="/categories/jackets"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-600 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Jackets</h3>
                </Link>
                <Link
                  href="/categories/shoes"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-600 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Shoes</h3>
                </Link>
              </>
            )}
            {mode === "women" && (
              <>
                <Link
                  href="/categories/dresses"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-pink-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Dresses</h3>
                </Link>
                <Link
                  href="/categories/tops"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-pink-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Tops</h3>
                </Link>
                <Link
                  href="/categories/jeans"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-pink-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Jeans</h3>
                </Link>
                <Link
                  href="/categories/accessories"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-pink-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Accessories</h3>
                </Link>
              </>
            )}
            {mode === "kids" && (
              <>
                <Link
                  href="/categories/t-shirts"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-amber-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">T-Shirts</h3>
                </Link>
                <Link
                  href="/categories/shorts"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-amber-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Shorts</h3>
                </Link>
                <Link
                  href="/categories/shoes"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-amber-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Shoes</h3>
                </Link>
                <Link
                  href="/categories/accessories"
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-amber-500 hover:shadow-lg"
                >
                  <h3 className="font-semibold">Accessories</h3>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 animate-in fade-in duration-700 delay-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">New Arrivals</h2>
            <Link
              href="/categories/new-arrivals"
              className={`flex items-center gap-1 text-sm font-medium ${styles.text} hover:underline`}
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modeProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
