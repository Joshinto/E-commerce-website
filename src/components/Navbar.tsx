"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Joshinto<span className="text-blue-600">Store</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-bold text-gray-600 transition hover:text-gray-900"
          >
            Shop
          </Link>

          <Link
            href="/categories"
            className="text-sm font-bold text-gray-600 transition hover:text-gray-900"
          >
            Categories
          </Link>

          <Link
            href="/about"
            className="text-sm font-bold text-gray-600 transition hover:text-gray-900"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-bold text-gray-600 transition hover:text-gray-900"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <Link
            href="/shop"
            aria-label="Search products"
            className="text-gray-600 transition hover:text-gray-900"
          >
            <Search size={21} />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="text-gray-600 transition hover:text-gray-900"
          >
            <Heart size={21} />
          </Link>

          {/* Cart */}
          <Link
          href="/cart"
          className="relative flex items-center justify-center"
          aria-label="Shopping cart"
        >
          <ShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>

          {/* Login */}
          <Link
            href="/orders"
            className="hidden items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:flex"
          >
            <User size={17} />
            My Orders
          </Link>
        </div>
      </div>
    </header>
  );
}