"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "../../context/cartContext";

export default function CartPage() {
  const {
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartTotal,
} = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <ShoppingBag size={36} className="text-gray-400" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-500">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>

          <Link
            href="/shop"
            className="mt-8 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-gray-900">
          Shopping Cart
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-full rounded-xl object-cover sm:h-28 sm:w-28"
                />

                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {item.category}
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-gray-900">
                    {item.name}
                  </h2>

                  <p className="mt-2 font-bold text-gray-900">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                  {/* Quantity */}
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="flex h-9 w-10 items-center justify-center border-x border-gray-300 text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>

                <span className="font-medium text-gray-900">
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-lg bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-blue-600"
                >
                Proceed to Checkout
                </Link>
          </div>
        </div>
      </div>
    </main>
  );
}