"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type QuantitySelectorProps = {
  productName: string;
};

export default function QuantitySelector({
  productName,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
      <button
        type="button"
        onClick={() => setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))}
        aria-label={`Decrease quantity of ${productName}`}
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
        onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
        aria-label={`Increase quantity of ${productName}`}
        className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
