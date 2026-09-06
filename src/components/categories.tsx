import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    description: "Phones, laptops & gadgets",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fashion",
    description: "Clothing, shoes & accessories",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Home & Living",
    description: "Furniture & home essentials",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Beauty",
    description: "Skincare & beauty products",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Categories
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 max-w-xl text-gray-600">
              Explore our most popular categories and find products you&apos;ll
              love.
            </p>
          </div>

          <Link
            href="/categories"
            className="hidden text-sm font-semibold text-gray-900 transition hover:text-blue-600 sm:block"
          >
            View All →
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.name
                .toLowerCase()
                .replaceAll(" ", "-")
                .replace("&", "and")}`}
              key={category.name}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>

                  <p className="mt-1 text-sm text-white/80">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold opacity-0 transition duration-300 group-hover:opacity-100">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}