import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            About JoshintoStore
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Shopping made simple
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We bring useful products, clear prices, and dependable service
            together in one easy-to-use store.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  );
}
