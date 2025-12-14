"use client"

import { useWishlist } from "@/lib/wishlist-context"
import { useMode } from "@/lib/mode-context"
import { ProductCard } from "@/components/product-card"
import { Heart } from "lucide-react"

export default function WishlistPage() {
  const { items } = useWishlist()
  const { mode } = useMode()

  const getModeStyles = () => {
    if (mode === "men") return { text: "text-blue-600" }
    if (mode === "women") return { text: "text-pink-600" }
    return { text: "text-amber-600" }
  }

  const styles = getModeStyles()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Heart className={`mx-auto mb-4 h-16 w-16 ${styles.text}`} />
          <h1 className="mb-2 text-3xl font-bold">Your Wishlist is Empty</h1>
          <p className="text-gray-600">Start adding items you love to your wishlist!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">My Wishlist ({items.length})</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
