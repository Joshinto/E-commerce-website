import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import ProductActions from "../../../components/productActions";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 85000,
    oldPrice: 105000,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience immersive sound with these premium wireless headphones. Designed for comfort, quality, and everyday use.",
  },
  {
    id: 2,
    name: "Classic Sneakers",
    category: "Fashion",
    price: 65000,
    oldPrice: 80000,
    rating: 4.6,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    description:
      "Classic sneakers designed for everyday comfort and style. Perfect for casual outings and daily wear.",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 120000,
    rating: 4.9,
    reviews: 215,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    description:
      "Stay connected and track your everyday activities with this stylish and feature-packed smart watch.",
  },
  {
    id: 4,
    name: "Leather Backpack",
    category: "Accessories",
    price: 45000,
    oldPrice: 60000,
    rating: 4.5,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    description:
      "A stylish leather backpack with enough space for your everyday essentials, work equipment, and accessories.",
  },
  {
    id: 5,
    name: "Minimalist Chair",
    category: "Home & Living",
    price: 95000,
    rating: 4.7,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    description:
      "A comfortable minimalist chair designed to bring practical style to your home or workspace.",
  },
  {
    id: 6,
    name: "Premium Sunglasses",
    category: "Fashion",
    price: 35000,
    oldPrice: 45000,
    rating: 4.4,
    reviews: 73,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    description:
      "Premium sunglasses with a timeless frame for comfortable everyday wear.",
  },
  {
    id: 7,
    name: "Modern Camera",
    category: "Electronics",
    price: 280000,
    rating: 4.9,
    reviews: 91,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    description:
      "Capture clear, detailed photos with this modern camera built for creative work.",
  },
  {
    id: 8,
    name: "Leather Handbag",
    category: "Accessories",
    price: 75000,
    oldPrice: 95000,
    rating: 4.6,
    reviews: 61,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
    description:
      "A spacious leather handbag that combines everyday function with refined style.",
  },
];

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The product you&apos;re looking for does not exist.
          </p>

          <Link
            href="/shop"
            className="mt-8 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Product */}
      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:gap-20 lg:px-8">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />

            {product.oldPrice && (
              <span className="absolute left-5 top-5 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white">
                Sale
              </span>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={
                      star <= Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ₦{product.price.toLocaleString()}
              </span>

              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₦{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            <ProductActions product={product} />

            {/* Extra Information */}
            <div className="mt-10 border-t border-gray-200 pt-6">
              <div className="flex justify-between border-b border-gray-100 py-4">
                <span className="text-sm text-gray-500">
                  Category
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-sm text-gray-500">
                  Availability
                </span>

                <span className="text-sm font-medium text-green-600">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}