"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedOrders = localStorage.getItem("joshinto-orders");

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View your previous orders and their current status.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Package
                size={36}
                className="text-gray-400"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven't placed any orders yet.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order Number
                    </p>

                    <h2 className="mt-1 font-bold text-gray-900">
                      #{order.orderNumber}
                    </h2>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          ₦{item.price.toLocaleString()} each
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-gray-900">
                          ₦
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-medium capitalize text-gray-900">
                      {order.paymentMethod}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold text-gray-900">
                      ₦{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}