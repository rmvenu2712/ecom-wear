"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { products, type Product } from "@/lib/products-data"
import { useMode } from "@/lib/mode-context"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const { mode } = useMode()

  useEffect(() => {
    if (query.trim()) {
      const filtered = products
        .filter((p) => p.mode === mode)
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 6)
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query, mode])

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto mt-4 max-w-2xl rounded-lg bg-white p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border-none text-base outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {results.length > 0 && (
          <div className="mt-3 max-h-96 space-y-2 overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={60}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="text-sm font-semibold">₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-500">No products found for "{query}"</div>
        )}
      </div>
    </div>
  )
}
