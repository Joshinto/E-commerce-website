import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">
        
        {/* Left Content */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
            New Collection
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-gray-900 lg:text-6xl">
            Discover Products
            <span className="block text-blue-600">
              You&apos;ll Love
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Shop the latest products, discover amazing deals, and find
            everything you need in one place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/categories"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Explore Categories
            </Link>
          </div>

          {/* Small stats */}
          <div className="mt-12 flex gap-10">
            <div>
              <p className="text-2xl font-bold text-gray-900">10K+</p>
              <p className="mt-1 text-sm text-gray-500">
                Products
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">50K+</p>
              <p className="mt-1 text-sm text-gray-500">
                Customers
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">4.9/5</p>
              <p className="mt-1 text-sm text-gray-500">
                Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80"
              alt="Featured ecommerce products"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Floating discount card */}
          <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl">
            <p className="text-sm font-medium text-gray-500">
              Special Offer
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              Up to 40% Off
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Selected products
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}