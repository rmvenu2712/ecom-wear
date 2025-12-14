"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useMode } from "@/lib/mode-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CreditCard, Wallet } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { mode } = useMode()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)

  const shippingFee = total >= 999 ? 0 : 99
  const discount = total >= 2000 ? Math.floor(total * 0.1) : 0
  const finalTotal = total + shippingFee - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill in all fields")
      return
    }

    if (items.length === 0) {
      alert("Your cart is empty")
      return
    }

    setIsProcessing(true)

    const hasInvalidItems = items.some((item) => !item.size || !item.color)
    if (hasInvalidItems) {
      alert("Some items in your cart are missing size or color selection")
      setIsProcessing(false)
      return
    }

    const receiptId = `receipt_${Date.now()}`

    const orderData = {
      orderId: receiptId,
      items,
      total: finalTotal,
      shippingAddress: formData,
      orderDate: new Date().toISOString(),
      status: "ordered",
    }

    if (paymentMethod === "cod") {
      localStorage.setItem("lastOrder", JSON.stringify(orderData))
      setIsProcessing(false)
      router.push(`/order-success?orderId=${receiptId}`)
      return
    }

    if (paymentMethod === "razorpay") {
      try {
        const response = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalTotal * 100,
            currency: "INR",
            receipt: receiptId,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create order")
        }

        const order = await response.json()

        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
          const options = {
            key: "rzp_test_RrSu5N23RN2dVw",
            amount: finalTotal * 100,
            currency: "INR",
            name: "StyleMart",
            image: "/logo.png",
            description: "Order Payment",
            order_id: order.id,
            handler: (response: any) => {
              console.log(" Payment successful:", response)
              localStorage.setItem(
                "lastOrder",
                JSON.stringify({
                  ...orderData,
                  paymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                }),
              )
              clearCart()
              setIsProcessing(false)
              router.push(`/order-success?orderId=${receiptId}`)
            },
            prefill: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              contact: formData.phone,
            },
            theme: {
              color: mode === "men" ? "#2563eb" : mode === "women" ? "#ec4899" : "#f59e0b",
            },
            modal: {
              ondismiss: () => {
                console.log(" Payment cancelled by user")
                setIsProcessing(false)
              },
            },
          }

          const razorpayInstance = new window.Razorpay(options)
          razorpayInstance.on("payment.failed", (response: any) => {
            console.error(" Payment failed:", response.error)
            alert(`Payment failed: ${response.error.description}`)
            setIsProcessing(false)
          })
          razorpayInstance.open()
        }

        script.onerror = () => {
          alert("Failed to load Razorpay. Please try again.")
          setIsProcessing(false)
        }
      } catch (error) {
        console.error(" Order creation error:", error)
        alert("Failed to create order. Please try again.")
        setIsProcessing(false)
      }
    }
  }

  const getModeStyles = () => {
    if (mode === "men") return { accent: "bg-blue-600 hover:bg-blue-700", text: "text-blue-600" }
    if (mode === "women") return { accent: "bg-pink-500 hover:bg-pink-600", text: "text-pink-600" }
    return { accent: "bg-amber-500 hover:bg-amber-600", text: "text-amber-600" }
  }

  const styles = getModeStyles()

  // if (items.length === 0) {
  //   router.push("/cart")
  //   return null
  // }

  return (
    <div className="bg-white animate-in fade-in duration-500">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold animate-in slide-in-from-top duration-500">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 animate-in slide-in-from-left duration-500 delay-100">
              <div className="mb-8 rounded-lg border border-gray-200 p-6 transition-all hover:shadow-md">
                <h2 className="mb-6 text-xl font-bold">Shipping Address</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="mb-2 block text-sm font-medium">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="mb-2 block text-sm font-medium">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="mb-2 block text-sm font-medium">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6 transition-all hover:shadow-md">
                <h2 className="mb-6 text-xl font-bold">Payment Method</h2>

                <div className="space-y-3">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      paymentMethod === "razorpay"
                        ? "border-gray-900 bg-gray-50 scale-[1.02]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4"
                    />
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Razorpay</p>
                      <p className="text-xs text-gray-600">Credit/Debit Card, UPI, Net Banking, Wallets</p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      paymentMethod === "cod"
                        ? "border-gray-900 bg-gray-50 scale-[1.02]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4"
                    />
                    <Wallet className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-xs text-gray-600">Pay when you receive</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-lg border border-gray-200 bg-gray-50 p-6 animate-in slide-in-from-right duration-500 delay-200">
                <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

                <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                      <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.size} | {item.color}
                        </p>
                        <p className="text-sm font-semibold">
                          ₹{item.product.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-b border-t border-gray-300 py-4">
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

                <Button
                  type="submit"
                  className={`mt-6 w-full text-white ${styles.accent} transition-all hover:scale-105`}
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="mt-4 text-center text-xs text-gray-600">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
