import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Product Not Found</h2>
      <p className="mb-8 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
      <Link href="/">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  )
}
