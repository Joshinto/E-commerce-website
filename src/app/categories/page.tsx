import Link from "next/link";
import Navbar from "../../components/Navbar";

const categories = [
  { name: "Electronics", description: "Phones, laptops, and gadgets" },
  { name: "Fashion", description: "Clothing, shoes, and accessories" },
  { name: "Accessories", description: "Everyday essentials and more" },
  { name: "Home & Living", description: "Furniture and home essentials" },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            Shop by Category
          </h1>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {category.description}
                </p>
                <span className="mt-6 inline-block text-sm font-semibold text-blue-600">
                  Shop now
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
