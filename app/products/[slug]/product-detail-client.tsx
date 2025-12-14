"use client"

import { useState, useRef } from "react"
import { products } from "@/lib/products-data"
import { useMode } from "@/lib/mode-context"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { notFound } from "next/navigation"
import { useRouter } from "next/navigation"

export function ProductDetailClient({ slug }: { slug: string }) {
  const { mode } = useMode()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()
  const imageRef = useRef<HTMLDivElement>(null)

  const product = products.find((p) => p.slug === slug && p.mode === mode)

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [buttonState, setButtonState] = useState<"add" | "go">("add")
  const [sizeError, setSizeError] = useState("")
  const [colorError, setColorError] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!product) {
    notFound()
  }

  const inWishlist = isInWishlist(product.id)

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image]

  const relatedProducts = products
    .filter((p) => p.mode === mode && p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    let hasError = false

    if (!selectedSize) {
      setSizeError("Please select a size")
      hasError = true
    } else {
      setSizeError("")
    }

    if (!selectedColor) {
      setColorError("Please select a color")
      hasError = true
    } else {
      setColorError("")
    }

    if (hasError) {
      const sizeSection = document.getElementById("size-section")
      const colorSection = document.getElementById("color-section")
      if (!selectedSize && sizeSection) {
        sizeSection.classList.add("animate-shake")
        setTimeout(() => sizeSection.classList.remove("animate-shake"), 500)
      }
      if (!selectedColor && colorSection) {
        colorSection.classList.add("animate-shake")
        setTimeout(() => colorSection.classList.remove("animate-shake"), 500)
      }
      return
    }

    setIsAddingToCart(true)

    if (imageRef.current) {
      const clone = imageRef.current.cloneNode(true) as HTMLElement
      const rect = imageRef.current.getBoundingClientRect()

      clone.style.position = "fixed"
      clone.style.top = `${rect.top}px`
      clone.style.left = `${rect.left}px`
      clone.style.width = `${rect.width}px`
      clone.style.height = `${rect.height}px`
      clone.style.zIndex = "9999"
      clone.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      clone.style.pointerEvents = "none"

      document.body.appendChild(clone)

      setTimeout(() => {
        clone.style.top = "20px"
        clone.style.right = "100px"
        clone.style.left = "auto"
        clone.style.width = "50px"
        clone.style.height = "50px"
        clone.style.opacity = "0"
      }, 10)

      setTimeout(() => {
        document.body.removeChild(clone)
      }, 850)
    }

    addItem({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })

    setButtonState("go")
    setShowSuccess(true)

    setTimeout(() => {
      setIsAddingToCart(false)
      setShowSuccess(false)
    }, 2000)
  }

  const handleGoToCart = () => {
    router.push("/cart")
  }

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const getModeStyles = () => {
    if (mode === "men")
      return { accent: "bg-blue-600 hover:bg-blue-700", text: "text-blue-600", border: "border-blue-600" }
    if (mode === "women")
      return { accent: "bg-pink-500 hover:bg-pink-600", text: "text-pink-600", border: "border-pink-500" }
    return { accent: "bg-amber-500 hover:bg-amber-600", text: "text-amber-600", border: "border-amber-500" }
  }

  const styles = getModeStyles()

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="bg-white">
      {showSuccess && (
        <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 animate-in slide-in-from-top rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
          Added to cart successfully!
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4">
              <Image
                src={productImages[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.discount && (
                <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-sm font-semibold text-white">
                  {product.discount}% OFF
                </div>
              )}

              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIndex === idx ? `${styles.border}` : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-2 text-sm text-gray-500">{product.category}</div>
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>

            <div id="size-section" className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Select Size</h3>
                {sizeError && <span className="text-sm text-red-500 animate-in fade-in">{sizeError}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size)
                      setSizeError("")
                    }}
                    className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? `${styles.border} ${styles.text}`
                        : sizeError
                          ? "border-red-300 text-gray-700 hover:border-red-400"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div id="color-section" className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Select Color</h3>
                {colorError && <span className="text-sm text-red-500 animate-in fade-in">{colorError}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color)
                      setColorError("")
                    }}
                    className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-all ${
                      selectedColor === color
                        ? `${styles.border} ${styles.text}`
                        : colorError
                          ? "border-red-300 text-gray-700 hover:border-red-400"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 font-semibold">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6 flex gap-3">
              <Button
                onClick={buttonState === "add" ? handleAddToCart : handleGoToCart}
                className={`flex-1 text-white ${styles.accent} transition-all`}
                size="lg"
                disabled={isAddingToCart}
              >
                {buttonState === "add" ? (
                  "Add to Cart"
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Go to Cart
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`h-12 w-12 p-0 transition-all ${
                  inWishlist ? `${styles.border} ${styles.text}` : "bg-transparent"
                }`}
                onClick={handleWishlistClick}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="lg" className="h-12 w-12 p-0 bg-transparent">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
