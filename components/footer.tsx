"use client"

import { useMode } from "@/lib/mode-context"
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from '@/public/logo.png'
import Image from "next/image"
import { useState } from "react"
import { CustomToast } from "./custom-toast"

type ToastType = "success" | "error" | "info"

interface ToastState {
  show: boolean
  message: string
  type: ToastType
}

export function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info"
  })

  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  const { mode } = useMode()

  const getModeColor = () => {
    if (mode === "men") return "bg-blue-600 hover:bg-blue-700"
    if (mode === "women") return "bg-pink-500 hover:bg-pink-600"
    return "bg-amber-500 hover:bg-amber-600"
  }

  const getTextColor = () => {
    if (mode === "men") return "text-blue-600 hover:text-blue-700"
    if (mode === "women") return "text-pink-500 hover:text-pink-600"
    return "text-amber-500 hover:text-amber-600"
  }

  const getImageFilter = () => {
    if (mode === "men") {
      return "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(186deg) brightness(98%) contrast(97%)"
    }
    if (mode === "women") {
      return "brightness(0) saturate(100%) invert(64%) sepia(55%) saturate(4821%) hue-rotate(314deg) brightness(99%) contrast(92%)"
    }
    return "brightness(0) saturate(100%) invert(66%) sepia(83%) saturate(450%) hue-rotate(359deg) brightness(98%) contrast(92%)"
  }

  // Custom toast function
  const showToast = (message: string, type: ToastType) => {
    setToast({ show: true, message, type })
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!email || !email.includes('@')) {
      showToast("Please enter a valid email address", "error")
      return
    }

    setIsSubmitting(true)

    // Prepare data for Web3Forms
    const submissionData = {
      access_key: '3b0957a5-dbf4-41ce-91b8-aefd1dc393f6',
      name: 'Ecom Wear Client',
      email: email,
      company: 'Ecom Newsletter Subscriber',
      message: `Newsletter subscription request from: ${email}`,
      subject: `New Newsletter Subscription - Ecom Wear`,
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()
      console.log("result", result)

      if (result.success) {
        showToast("Thank you! Your subscription is confirmed. Stay tuned for our latest updates and exclusive offers!", "success")
        setEmail("") // Clear the input
      } else {
        console.error('Web3Forms Error:', result)
        showToast("Oops! Something went wrong. Please try again.", "error")
      }
    } catch (error) {
      console.error('Subscription Error:', error)
      showToast("Unable to subscribe right now. Please try again later.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Custom Toast */}
      {toast.show && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/categories/all" className="text-gray-600 hover:text-gray-900">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories/new-arrivals" className="text-gray-600 hover:text-gray-900">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/categories/sale" className="text-gray-600 hover:text-gray-900">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-600 hover:text-gray-900">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-600 hover:text-gray-900">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Newsletter</h3>
              <p className="mb-3 text-sm text-gray-600">Subscribe to get special offers and updates.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  disabled={isSubmitting}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 disabled:opacity-50"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-md ${getModeColor()} px-4 py-2 text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </button>
              </form>

              <div className={`mt-6 flex items-center justify-start gap-5 ${getTextColor()}`}>
                <Link
                  href="https://www.linkedin.com/in/venu-rm/"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="transition-transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>

                <Link
                  href="https://api.whatsapp.com/send?phone=916385538151&text=Hi%20Venu,%20nice%20to%20meet%20you.%20Can%20we%20connect"
                  target="_blank"
                  aria-label="WhatsApp"
                  className="transition-transform hover:scale-110"
                >
                  <MessageCircle className="w-5 h-5" />
                </Link>

                <Link
                  href="https://github.com/rmvenu2712"
                  target="_blank"
                  aria-label="GitHub"
                  className="transition-transform hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </Link>

                <Link
                  href="mailto:rmvenu001@gmail.com"
                  aria-label="Email"
                  className="transition-transform hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t-2 border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-600 tracking-wide">
              Crafted with passion by{" "}
              <a 
                href="https://venurm.pages.dev/" 
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-lg px-3 py-1.5 font-semibold transition-all duration-300 hover:scale-105 ${getTextColor()}`}
              >
                <Image 
                  src={logo} 
                  alt="VENU Logo" 
                  className="inline-block w-5 h-5 mr-2 transition-all duration-300" 
                  style={{ filter: getImageFilter() }} 
                />
                Venu RM
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
