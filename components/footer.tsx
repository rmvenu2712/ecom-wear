"use client"

import { useMode } from "@/lib/mode-context"
import { BugIcon, Github, Linkedin, Mail, MessageCircle, PiIcon, Settings, WheatIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


export function Footer() {

  const pathname = usePathname()

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


  return (
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
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
              />
              <button className={`rounded-md  ${getModeColor()} px-4 py-2 text-sm text-white`}>
                Subscribe
              </button>
            </div>

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

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>
            Developed by{" "}
            <a href="https://venurm.pages.dev/"  target="_blank"
              className={`inline-block rounded-md  py-1 font-medium transition-colors ${getTextColor()}`}
            >
           Venu
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
