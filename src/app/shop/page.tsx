"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/productCard";

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
  {
    id: 5,
    name: "Minimalist Chair",
    category: "Home & Living",
    price: 95000,
    rating: 4.7,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Modern Camera",
    category: "Electronics",
    price: 280000,
    rating: 4.9,
    reviews: 91,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Accessories",
  "Home & Living",
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-low") {
        return a.price - b.price;
      }

      if (sortOption === "price-high") {
        return b.price - a.price;
      }

      if (sortOption === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Shop
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
            All Products
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Browse our collection of quality products and find something
            you&apos;ll love.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Search and Controls */}
          <div className="mb-10 border-b border-gray-200 pb-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Shop Products
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {/* Search and Sort */}
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:w-64"
                />

                <select
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Categories */}
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                No products found
              </h3>

              <p className="mt-2 text-gray-500">
                Try another search or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSortOption("featured");
                }}
                className="mt-6 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}