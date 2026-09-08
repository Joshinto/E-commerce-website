"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";

type Product = {
  id: number | string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
};

export default function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, increaseQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = isInWishlist(product.id);

  const addProductToCart = () => {
    addToCart(product);
    for (let index = 1; index < quantity; index += 1) {
      increaseQuantity(product.id);
    }
  };

  const handleBuyNow = () => {
    addProductToCart();
    router.push("/checkout");
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-gray-900">Quantity</p>
        <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            aria-label={`Decrease quantity of ${product.name}`}
            disabled={quantity === 1}
            className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={18} />
          </button>
          <span className="flex h-12 w-14 items-center justify-center border-x border-gray-300 font-semibold">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((current) => current + 1)}
            aria-label={`Increase quantity of ${product.name}`}
            className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addProductToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-blue-600"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add product to wishlist"}
          className="flex h-14 w-14 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100"
        >
          <Heart className={isWishlisted ? "fill-red-500 text-red-500" : ""} size={21} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        className="mt-3 w-full rounded-lg border border-gray-900 px-6 py-4 font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
      >
        Buy Now
      </button>
    </>
  );
}
