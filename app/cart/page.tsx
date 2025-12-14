"use client"

import { useCart } from "@/lib/cart-context"
import { useMode } from "@/lib/mode-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const { mode } = useMode()

  const getModeStyles = () => {
    if (mode === "men") return { accent: "bg-blue-600 hover:bg-blue-700", text: "text-blue-600" }
    if (mode === "women") return { accent: "bg-pink-500 hover:bg-pink-600", text: "text-pink-600" }
    return { accent: "bg-amber-500 hover:bg-amber-600", text: "text-amber-600" }
  }

  const styles = getModeStyles()

  const shippingFee = total >= 999 ? 0 : 99
  const discount = total >= 2000 ? Math.floor(total * 0.1) : 0
  const finalTotal = total + shippingFee - discount

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 animate-in fade-in duration-500">
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingBag className="mb-4 h-24 w-24 text-gray-300 animate-in zoom-in duration-500" />
          <h2 className="mb-2 text-2xl font-bold animate-in slide-in-from-bottom duration-500 delay-100">
            Your Cart is Empty
          </h2>
          <p className="mb-8 text-gray-600 animate-in slide-in-from-bottom duration-500 delay-200">
            Add some products to get started!
          </p>
          <Link href="/" className="animate-in slide-in-from-bottom duration-500 delay-300">
            <Button size="lg" className={`text-white ${styles.accent} transition-all hover:scale-105`}>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white animate-in fade-in duration-500">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold animate-in slide-in-from-top duration-500">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="rounded-lg border border-gray-200 p-4 animate-in slide-in-from-left duration-500 transition-all hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/products/${item.product.slug}`} className="font-medium hover:underline">
                              {item.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-gray-500">
                              Size: {item.size} | Color: {item.color}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="mt-2 font-semibold">₹{item.product.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-md border border-gray-300">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-sm font-semibold">Subtotal: ₹{item.product.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-gray-200 bg-gray-50 p-6 animate-in slide-in-from-right duration-500 delay-200">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 border-b border-gray-300 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${shippingFee === 0 ? "text-green-600" : ""}`}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount (10%)</span>
                    <span className="font-medium text-green-600">-₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>

              {total < 999 && (
                <p className="mt-3 text-xs text-gray-600">Add ₹{999 - total} more to get free shipping!</p>
              )}

              {total >= 1500 && total < 2000 && (
                <p className="mt-3 text-xs text-gray-600">Add ₹{2000 - total} more to get 10% discount!</p>
              )}

              <Link href="/checkout">
                <Button className={`mt-6 w-full text-white ${styles.accent} transition-all hover:scale-105`} size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="mt-3 w-full bg-transparent transition-all hover:scale-105"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 space-y-2 border-t border-gray-300 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-600 animate-in slide-in-from-left duration-500 delay-300">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 animate-in slide-in-from-left duration-500 delay-400">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 animate-in slide-in-from-left duration-500 delay-500">
                  <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                  <span>Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
