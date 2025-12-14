"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { Product } from "@/lib/products-data"
import { Star, Heart } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"
import { useMode } from "@/lib/mode-context"

export function ProductCard({ product }: { product: Product }) {
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const { mode } = useMode()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const inWishlist = isInWishlist(product.id)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    if (inWishlist) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const getModeStyles = () => {
    if (mode === "men") return { heart: "text-blue-600" }
    if (mode === "women") return { heart: "text-pink-600" }
    return { heart: "text-amber-600" }
  }

  const styles = getModeStyles()

  const displayImage = isHovered && product.images && product.images.length > 1 ? product.images[1] : product.image

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={displayImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        {product.discount && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            {product.discount}% OFF
          </div>
        )}
        <button
          onClick={handleWishlistClick}
          className={`absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110 ${
            isAnimating ? "animate-bounce" : ""
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-4 w-4 transition-all ${inWishlist ? `${styles.heart} fill-current` : "text-gray-600"}`}
          />
        </button>
      </div>
      <div className="p-3">
        <h3 className="mb-1 line-clamp-2 text-sm font-medium">{product.name}</h3>
        <p className="mb-2 text-xs text-gray-500">{product.category}</p>
        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
