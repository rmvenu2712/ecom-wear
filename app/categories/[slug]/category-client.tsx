"use client"

import { products } from "@/lib/products-data"
import { useMode } from "@/lib/mode-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

export function CategoryClient({ slug }: { slug: string }) {
  const { mode } = useMode()
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  let filteredProducts = products.filter((p) => p.mode === mode)

  // Apply category filter
  if (slug !== "all" && slug !== "new-arrivals" && slug !== "sale") {
    const categoryName = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase())
  }

  if (slug === "sale") {
    filteredProducts = filteredProducts.filter((p) => p.discount)
  }

  // Apply selected category filters
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) => selectedCategories.includes(p.category))
  }

  // Apply price range filter
  filteredProducts = filteredProducts.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

  // Apply sorting
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  const categories = Array.from(new Set(products.filter((p) => p.mode === mode).map((p) => p.category)))

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="bg-white animate-in fade-in duration-500">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 animate-in slide-in-from-top duration-500">
          <h1 className="mb-2 text-3xl font-bold capitalize">
            {slug === "all"
              ? "All Products"
              : slug === "new-arrivals"
                ? "New Arrivals"
                : slug === "sale"
                  ? "Sale"
                  : slug.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} products</p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 animate-in slide-in-from-left duration-500 delay-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 transition-all hover:scale-105"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm outline-none transition-all focus:border-gray-900 hover:border-gray-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 animate-in slide-in-from-top duration-300">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="mb-3 font-semibold">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 transition-all hover:translate-x-1">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </p>
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 10000])
                    setSelectedCategories([])
                  }}
                  className="transition-all hover:scale-105"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center animate-in fade-in duration-500">
            <p className="text-lg text-gray-500">No products found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setPriceRange([0, 10000])
                setSelectedCategories([])
              }}
              className="mt-4 transition-all hover:scale-105"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
