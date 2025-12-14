"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useMode } from "@/lib/mode-context"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { SearchBar } from "./search-bar"
import { usePathname } from "next/navigation"
import { Logo } from "./Logo"

export function Header() {
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const { mode } = useMode()
  const { user } = useAuth()
  const [showSearch, setShowSearch] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()

  const getModeColor = () => {
    if (mode === "men") return "bg-blue-600 hover:bg-blue-700"
    if (mode === "women") return "bg-pink-500 hover:bg-pink-600"
    return "bg-amber-500 hover:bg-amber-600"
  }

  if (pathname === "/login" || pathname === "/register") {
    return null
  }
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="text-xl flex items-center gap-2  uppercase font-bold">
            <div className="w-10 h-w-10">
            <Logo/>
            </div>
              <span className={mode === "kids" ? "font-extrabold" : ""}>
                {mode === "men" ? "STYLEMART" : mode === "women" ? "Elegance" : "KidZone"}
              </span>
            </Link>
          </div>

          <nav className="hidden uppercase items-center gap-6 lg:flex">
            <Link href="/categories/all" className="text-sm font-medium hover:underline">
              Shop All
            </Link>
            <Link href="/categories/new-arrivals" className="text-sm font-medium hover:underline">
              New Arrivals
            </Link>
            <Link href="/categories/sale" className="text-sm font-medium hover:underline">
              Sale
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" onClick={() => setShowSearch(!showSearch)} className="h-9 w-9 p-0">
              <Search className="h-4 w-4" />
            </Button>
            <Link href={user ? "/account" : "/login"}>
              <Button variant="ghost" size="sm" className="hidden h-9 w-9 p-0 sm:inline-flex">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button size="sm" className={`relative h-9 w-9 p-0 text-white ${getModeColor()}`}>
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {showMenu && (
          <div className="border-t uppercase border-gray-200 bg-white px-4 py-3 lg:hidden">
            <nav className="flex flex-col gap-3">
              <Link href="/categories/all" className="text-sm font-medium">
                Shop All
              </Link>
              <Link href="/categories/new-arrivals" className="text-sm font-medium">
                New Arrivals
              </Link>
              <Link href="/categories/sale" className="text-sm font-medium">
                Sale
              </Link>
              <Link href="/about" className="text-sm font-medium">
                About
              </Link>
            </nav>
          </div>
        )}
      </header>

      {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
    </>
  )
}
