import Link from "next/link";
import productCard from "./productCard";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 85000,
    oldPrice: 105000,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 120000,
    rating: 4.9,
    reviews: 215,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Featured
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Featured Products
            </h2>

            <p className="mt-3 max-w-xl text-gray-600">
              Discover our handpicked selection of popular products.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-gray-900 transition hover:text-blue-600 sm:block"
          >
            View All →
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <productCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}