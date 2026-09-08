import Link from "next/link";
import Navbar from "../../components/Navbar";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Phones, laptops, headphones and more",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, shoes and accessories",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Furniture, decor and home essentials",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Beauty",
    description: "Skincare, makeup and beauty products",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Sports",
    description: "Fitness equipment and sportswear",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Accessories",
    description: "Bags, watches, jewelry and more",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <section className="bg-white px-6 py-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Explore our store
        </p>

        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          Shop by Category
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Find everything you need from our wide range of carefully selected
          product categories.
        </p>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.name}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />

                <h2 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                  {category.name}
                </h2>
              </div>

              {/* Description */}
              <div className="p-5">
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}