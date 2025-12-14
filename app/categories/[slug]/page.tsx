import { CategoryClient } from "./category-client"
export const runtime = 'edge';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <CategoryClient slug={slug} />
}
