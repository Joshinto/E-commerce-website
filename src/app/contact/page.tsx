"use client";

import { FormEvent, useState } from "react";
import Navbar from "../../components/Navbar";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "makindejoshua01@gmail.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+234 701 405 4889",
    description: "Mon - Fri, 8am - 6pm",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Lagos, Nigeria",
    description: "Our main office",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    value: "Mon - Sat",
    description: "8:00 AM - 6:00 PM",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSuccessMessage(
        result.message || "Your message has been sent successfully."
      );

      form.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white px-6 py-16 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Get in touch
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Have a question, need help with an order, or simply want to talk
            to us? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon size={22} />
                </div>

                <h2 className="mt-4 font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm font-medium text-gray-900">
                  {item.value}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-6 pb-20 pt-8 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          {/* Information */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Send us a message
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              We&apos;d love to hear from you.
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-gray-600">
              Whether you have a question about our products, your order,
              delivery, or anything else, feel free to send us a message.
            </p>

            <div className="mt-8 rounded-2xl bg-gray-900 p-7 text-white">
              <h3 className="text-xl font-semibold">
                Need immediate assistance?
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Our customer support team is available during business hours
                to help you resolve your questions quickly.
              </p>

              <a
                href="tel:+2348001234567"
                className="mt-5 inline-block font-semibold underline underline-offset-4"
              >
                Call +234 701 405 4889
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {successMessage && (
                <div
                  role="alert"
                  className="rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700"
                >
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Write your message here..."
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Looking for quick answers?
          </h2>

          <p className="mt-3 text-gray-600">
            Check our frequently asked questions for answers to common
            questions about orders, payments, and delivery.
          </p>

          <a
            href="/faq"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Visit FAQ
          </a>
        </div>
      </section>
    </main>
  );
}