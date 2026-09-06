"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const liked = isInWishlist(product.id);

  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          onClick={() => {
            if (liked) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist(product);
            }
          }}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition ${
            liked
              ? "text-red-500"
              : "text-gray-700 hover:bg-gray-900 hover:text-white"
          }`}
        >
          <Heart
            size={18}
            className={liked ? "fill-red-500" : ""}
          />
        </button>

        {/* Sale Badge */}
        {product.oldPrice && (
          <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            Sale
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 transition hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                className={
                  star <= Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-xs text-gray-500">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-bold text-gray-900">
            ₦{product.price.toLocaleString()}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₦{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}