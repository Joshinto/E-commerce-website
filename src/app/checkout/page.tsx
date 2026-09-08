"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../../context/cartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handlePlaceOrder = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const order = {
      orderNumber: `JS${Date.now()}`,
      customer: formData,
      paymentMethod,
      items: cartItems,
      total: cartTotal,
      status: "Processing",
    };

    localStorage.setItem("joshinto-order", JSON.stringify(order));

    clearCart();

    router.push("/order-success");
  };

  // Show this when the cart is empty
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add some products before proceeding to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-8 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Back to Cart */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-gray-900">
          Checkout
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">
            {/* CUSTOMER INFORMATION */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Customer Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telephone Number"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* SHIPPING ADDRESS */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Shipping Address
              </h2>

              <div className="mt-6 space-y-5">
                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                      errors.address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Lagos"
                      className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                        errors.city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-700"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Lagos State"
                      className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                        errors.state
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* PAYMENT */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Payment Method
              </h2>

              <div className="mt-6 space-y-4">
                {/* Card */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />

                  <span className="font-medium">
                    Credit / Debit Card
                  </span>
                </label>

                {/* Bank Transfer */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === "transfer"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />

                  <span className="font-medium">
                    Bank Transfer
                  </span>
                </label>

                {/* Cash */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />

                  <span className="font-medium">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* ORDER SUMMARY */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium text-gray-900">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTALS */}
            <div className="mt-6 border-t border-gray-200 pt-5">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="mt-5 flex justify-between border-t border-gray-200 pt-5">
                <span className="font-bold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* PLACE ORDER */}
             <button
                type="button"
                onClick={() => {
                    const isValid = validateForm();

                    if (!isValid) {
                    return;
                    }

                    const order = {
                    orderNumber: `JS${Date.now()}`,
                    customer: formData,
                    paymentMethod,
                    items: cartItems,
                    total: cartTotal,
                    status: "Processing",
                    createdAt: new Date().toISOString(),
                    };

                    localStorage.setItem(
                    "joshinto-order",
                    JSON.stringify(order)
                    );

                    clearCart();

                    router.push("/order-success");
                }}
                className="mt-6 w-full rounded-lg bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-blue-600"
                >
                Place Order
                </button>

          </div>
        </div>
      </div>
    </main>
  );
}
