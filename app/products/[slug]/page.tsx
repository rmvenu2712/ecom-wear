import { ProductDetailClient } from "./product-detail-client"
export const runtime = 'edge';
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <ProductDetailClient slug={slug} />
}
