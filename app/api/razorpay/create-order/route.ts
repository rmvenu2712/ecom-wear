import { NextResponse } from "next/server"
import Razorpay from "razorpay"
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = "INR", receipt } = body

    // Validate required fields
    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    // Initialize Razorpay with your credentials
    const razorpay = new Razorpay({
      key_id: "rzp_test_RrSu5N23RN2dVw",
      key_secret: "9CQ7Rl6LoeWAtVSvtfBLtmjH"
    })

    // Create actual order with Razorpay
    const order = await razorpay.orders.create({
      amount: amount, // already in paise from frontend
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`
    })

    console.log("Razorpay order created:", order)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    })
  } catch (error: any) {
    console.error("[Razorpay] Order creation error:", error)
    return NextResponse.json({ 
      error: error.error?.description || "Failed to create order" 
    }, { status: 500 })
  }
}
