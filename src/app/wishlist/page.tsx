"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/wishlistContext";
import { useCart } from "../../context/cartContext";

export default function WishlistPage() {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (item: (typeof wishlistItems)[number]) => {
    addToCart(item);
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center">
          <Heart
            size={64}
            className="text-gray-300"
          />

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your Wishlist is Empty
          </h1>

          <p className="mt-3 max-w-md text-gray-500">
            Save products you love here so you can
            easily find them later.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            <ShoppingBag size={18} />
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              My Wishlist
            </h1>

            <p className="mt-2 text-gray-500">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "item"
                : "items"}{" "}
              saved
            </p>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={17} />
            Clear Wishlist
          </button>
        </div>

        {/* Products */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              {/* Image */}
              <Link href={`/products/${item.id}`}>
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              {/* Details */}
              <div className="p-5">
                {item.category && (
                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>
                )}

                <Link href={`/products/${item.id}`}>
                  <h2 className="mt-1 font-semibold text-gray-900 hover:text-blue-600">
                    {item.name}
                  </h2>
                </Link>

                <div className="mt-3 flex items-center gap-2">
                  <span className="font-bold text-gray-900">
                    ₦{item.price.toLocaleString()}
                  </span>

                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₦{item.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 rounded-lg bg-gray-900 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(item.id)
                    }
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="rounded-lg border border-gray-300 px-3 text-gray-600 transition hover:border-red-300 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}