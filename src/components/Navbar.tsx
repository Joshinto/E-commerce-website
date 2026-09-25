"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/cartContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { data: session, status } = useSession();

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
            className="relative flex items-center justify-center text-gray-600 transition hover:text-gray-900"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authentication */}
          {status === "loading" ? (
            <div className="hidden h-10 w-24 animate-pulse rounded-lg bg-gray-200 sm:block" />
          ) : session ? (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/account"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-gray-900"
              >
                <User size={17} />

                <span>
                  Hi, {session.user?.name?.split(" ")[0] || "User"}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 transition hover:text-gray-900"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}