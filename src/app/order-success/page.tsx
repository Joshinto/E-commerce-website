"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="flex justify-center">
            <CheckCircle
              size={70}
              className="text-green-500"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for your purchase. Your order has been
            successfully placed.
          </p>

          <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Order Number
              </span>

              <span className="font-semibold text-gray-900">
                #JS20260908001
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-gray-500">
                Payment Status
              </span>

              <span className="font-semibold text-green-600">
                Pending
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-gray-500">
                Order Status
              </span>

              <span className="font-semibold text-gray-900">
                Processing
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}