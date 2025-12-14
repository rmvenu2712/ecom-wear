"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "./products-data"

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (e) {
        console.error("Failed to load wishlist from localStorage", e)
      }
    }
  }, [])

  useEffect(() => {
    // Save wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems
      }
      return [...prevItems, product]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId)
  }

  const itemCount = items.length

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, itemCount }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
