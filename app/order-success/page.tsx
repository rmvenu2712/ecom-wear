"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Home } from "lucide-react"
import { useMode } from "@/lib/mode-context"
import { useCart } from "@/lib/cart-context"

function OrderSuccessContent() {
    const { items, total, clearCart } = useCart()
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")
  const { mode } = useMode()
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }

    const lastOrder = localStorage.getItem("lastOrder")
    if (lastOrder) {
      clearCart()
      const order = JSON.parse(lastOrder)
      setOrderData(order)
    }
  }, [orderId, router])

  const getModeStyles = () => {
    if (mode === "men") return "text-blue-600"
    if (mode === "women") return "text-pink-600"
    return "text-amber-600"
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 animate-in zoom-in">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="mb-4 text-3xl font-bold">Order Placed Successfully!</h1>
          <p className="mb-8 text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>

          {orderData && (
            <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Package className={`h-5 w-5 ${getModeStyles()}`} />
                <p className="text-sm text-gray-600">Order ID:</p>
                <p className="font-mono font-semibold">{orderData.orderId}</p>
              </div>

              <div className="mb-4 border-t border-gray-300 pt-4">
                <h3 className="mb-2 font-semibold">Shipping Address</h3>
                <p className="text-sm text-gray-600">
                  {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}
                </p>
                <p className="text-sm text-gray-600">{orderData.shippingAddress.address}</p>
                <p className="text-sm text-gray-600">
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state} -{" "}
                  {orderData.shippingAddress.pincode}
                </p>
                <p className="text-sm text-gray-600">{orderData.shippingAddress.phone}</p>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total Paid:</span>
                  <span>₹{orderData.total}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href={`/orders/${orderId}`}>
              <Button size="lg" className="w-full bg-gray-900 text-white hover:bg-gray-800 sm:w-auto">
                Track Order
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full bg-transparent sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            A confirmation email has been sent to your email address with order details.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}
