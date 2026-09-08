"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubscribed(true);
    event.currentTarget.reset();
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold">
              JoshintoShop
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Your trusted online shopping destination for quality products,
              great prices, and a smooth shopping experience.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <span aria-hidden="true" className="font-bold">f</span>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <span aria-hidden="true" className="font-bold">ig</span>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <span aria-hidden="true" className="font-bold">x</span>
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <span aria-hidden="true" className="font-bold">yt</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/shop"
                  className="transition hover:text-white"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-white"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Customer Service
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/orders"
                  className="transition hover:text-white"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0" size={18} />

                <span>
                  Lagos, Nigeria
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="shrink-0" size={18} />

                <a
                  href="tel:+2347014054889"
                  className="transition hover:text-white"
                >
                  +234 701 405 4889
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="shrink-0" size={18} />

                <a
                  href="mailto:makindejoshua01@gmail.com"
                  className="transition hover:text-white"
                >
                  makindejoshua01@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 border-t border-gray-800 pt-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Subscribe to our newsletter
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Get updates about new products, special offers, and discounts.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-l-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white"
              />

              <button
                type="submit"
                className="rounded-r-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Subscribe
              </button>
            </form>

            {isSubscribed && (
              <p className="mt-3 text-sm text-green-400" role="status">
                Thanks for subscribing.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-500 sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} JoshintoShop. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/about"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}