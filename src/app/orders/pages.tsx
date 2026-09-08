"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

type OrderItem = {
  id: number | string;
  name: string;
  price: number | string;
  quantity: number | string;
  image?: string;
};

type Order = {
  orderNumber: string;
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
  };
  paymentMethod?: string;
  items?: OrderItem[];
  total: number | string;
  status?: string;
  createdAt: string;
};

const formatPrice = (value: number | string) => {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "0";
  }

  return amount.toLocaleString("en-NG");
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-700";

    case "shipped":
      return "bg-blue-100 text-blue-700";

    case "processing":
      return "bg-yellow-100 text-yellow-700";

    case "pending":
      return "bg-orange-100 text-orange-700";

    case "cancelled":
    case "canceled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("joshinto-orders");

      if (!savedOrders) {
        setOrders([]);
        return;
      }

      const parsedOrders = JSON.parse(savedOrders);

      if (!Array.isArray(parsedOrders)) {
        setOrders([]);
        return;
      }

      setOrders(parsedOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
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
        {/* Back to Shop */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        {/* Page Header */}
        <div className="mt-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View your previous orders and their current status.
          </p>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Package size={36} className="text-gray-400" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven&apos;t placed any orders yet.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders */
          <div className="mt-10 space-y-6">
            {orders.map((order, orderIndex) => {
              const items = Array.isArray(order.items)
                ? order.items
                : [];

              const status = order.status || "Pending";

              return (
                <div
                  key={`${order.orderNumber}-${orderIndex}`}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order Number
                      </p>

                      <h2 className="mt-1 font-bold text-gray-900">
                        #{order.orderNumber || "N/A"}
                      </h2>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-500">
                        Order Date
                      </p>

                      <p className="mt-1 font-medium text-gray-900">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Products */}
                  {items.length > 0 ? (
                    <div className="divide-y">
                      {items.map((item, itemIndex) => {
                        const price = Number(item.price) || 0;
                        const quantity = Number(item.quantity) || 0;

                        return (
                          <div
                            key={`${item.id}-${itemIndex}`}
                            className="flex gap-4 py-5"
                          >
                            {/* Product Image */}
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name || "Product"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Package
                                    size={28}
                                    className="text-gray-400"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Product Information */}
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {item.name || "Unnamed Product"}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Quantity: {quantity}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                ₦{formatPrice(price)} each
                              </p>
                            </div>

                            {/* Item Total */}
                            <div className="shrink-0">
                              <p className="font-bold text-gray-900">
                                ₦{formatPrice(price * quantity)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-sm text-gray-500">
                      No products found for this order.
                    </div>
                  )}

                  {/* Order Footer */}
                  <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Payment
                      </p>

                      <p className="font-medium capitalize text-gray-900">
                        {order.paymentMethod || "Not specified"}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <p className="text-xl font-bold text-gray-900">
                        ₦{formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}