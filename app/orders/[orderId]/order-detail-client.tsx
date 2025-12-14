"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Home } from "lucide-react"
import { useMode } from "@/lib/mode-context"

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const router = useRouter()
  const { mode } = useMode()
  const [orderData, setOrderData] = useState<any>(null)
  const [trackingStatus, setTrackingStatus] = useState("ordered")

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder")
    if (lastOrder) {
      const order = JSON.parse(lastOrder)
      if (order.orderId === orderId) {
        setOrderData(order)
        setTrackingStatus(order.status || "ordered")
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [orderId, router])

  const getModeStyles = () => {
    if (mode === "men") return { accent: "bg-blue-600", text: "text-blue-600" }
    if (mode === "women") return { accent: "bg-pink-500", text: "text-pink-600" }
    return { accent: "bg-amber-500", text: "text-amber-600" }
  }

  const styles = getModeStyles()

  const trackingSteps = [
    { id: "ordered", label: "Order Placed", icon: CheckCircle, description: "Your order has been confirmed" },
    { id: "packed", label: "Packed", icon: Package, description: "Your order is being prepared" },
    { id: "shipped", label: "Shipped", icon: Truck, description: "Your order is on the way" },
    { id: "delivered", label: "Delivered", icon: CheckCircle, description: "Order has been delivered" },
  ]

  const getStepStatus = (stepId: string) => {
    const statusOrder = ["ordered", "packed", "shipped", "delivered"]
    const currentIndex = statusOrder.indexOf(trackingStatus)
    const stepIndex = statusOrder.indexOf(stepId)

    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) return "current"
    return "pending"
  }

  if (!orderData) {
    return (
      <div className="flex min-h-screen items-center justify-center animate-in fade-in duration-500">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white animate-in fade-in duration-500">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <h1 className="mb-2 text-3xl font-bold">Order Details</h1>
          <p className="text-gray-600">
            Order ID: <span className="font-mono font-semibold">{orderData.orderId}</span>
          </p>
          <p className="text-sm text-gray-500">Placed on {new Date(orderData.orderDate).toLocaleDateString()}</p>
        </div>

        {/* Order Tracking */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 animate-in slide-in-from-left duration-500 delay-100 transition-all hover:shadow-md">
          <h2 className="mb-6 text-xl font-bold">Order Status</h2>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300 md:left-8"></div>

            <div className="space-y-8">
              {trackingSteps.map((step, index) => {
                const status = getStepStatus(step.id)
                const Icon = step.icon

                return (
                  <div
                    key={step.id}
                    className="relative flex items-start gap-4 animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                  >
                    <div
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full md:h-16 md:w-16 transition-all ${
                        status === "completed"
                          ? `${styles.accent} text-white`
                          : status === "current"
                            ? `${styles.accent} text-white animate-pulse`
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      <Icon className="h-4 w-4 md:h-6 md:w-6" />
                    </div>

                    <div className="flex-1 pt-1">
                      <h3
                        className={`font-semibold ${status === "completed" || status === "current" ? "text-gray-900" : "text-gray-500"}`}
                      >
                        {step.label}
                      </h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {status === "completed" && (
                        <p className="mt-1 text-xs text-gray-500">Completed on {new Date().toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8 rounded-lg border border-gray-200 p-6 animate-in slide-in-from-right duration-500 delay-200 transition-all hover:shadow-md"></div>

        {/* Shipping Address */}
        <div className="mb-8 rounded-lg border border-gray-200 p-6 animate-in slide-in-from-left duration-500 delay-300 transition-all hover:shadow-md"></div>

        {/* Order Summary */}
        <div className="mb-8 rounded-lg border border-gray-200 p-6 animate-in slide-in-from-right duration-500 delay-400 transition-all hover:shadow-md"></div>

        <div className="flex justify-center animate-in slide-in-from-bottom duration-500 delay-500">
          <Link href="/">
            <Button size="lg" variant="outline" className="bg-transparent transition-all hover:scale-105">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
