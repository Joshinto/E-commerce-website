"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

const paymentLabels: Record<string, string> = {
  card: "Credit / Debit Card",
  transfer: "Bank Transfer",
  cash: "Cash on Delivery",
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedOrder = localStorage.getItem("joshinto-order");

    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch {
        localStorage.removeItem("joshinto-order");
      }
    }

    setIsLoading(false);
  }, []);

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading order...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            No Order Found
          </h1>

          <p className="mt-3 text-gray-600">
            We could not find a recent order.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Success Message */}
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="flex justify-center">
            <CheckCircle
              size={72}
              className="text-green-500"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you for shopping with JoshintoStore.
          </p>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Order Number
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              #{order.orderNumber}
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Customer Information
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-900">
                {order.customer.firstName} {order.customer.lastName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">
                {order.customer.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">
                {order.customer.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium text-gray-900">
                {paymentLabels[order.paymentMethod] ||
                  order.paymentMethod}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Delivery Address
            </p>

            <p className="font-medium text-gray-900">
              {order.customer.address}, {order.customer.city},{" "}
              {order.customer.state}
            </p>
          </div>
        </div>

        {/* Ordered Products */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Ordered Products
          </h2>

          <div className="mt-5 divide-y">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatPrice(item.price)} each
                  </p>
                </div>

                <div className="flex items-center">
                  <p className="font-bold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 border-t pt-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                Total
              </span>

              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Order Status
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-yellow-500" />

            <span className="font-medium text-gray-700">
              {order.status}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Your order has been received and is being processed.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="flex-1 rounded-lg bg-gray-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}