import Navbar from "../../components/Navbar";

const features = [
  {
    title: "Quality Products",
    description:
      "We carefully select our products to give you quality, value, and reliability.",
  },
  {
    title: "Fast Delivery",
    description:
      "We work hard to get your orders delivered quickly and safely to your doorstep.",
  },
  {
    title: "Secure Shopping",
    description:
      "Your shopping experience matters to us. We provide a simple and secure way to shop online.",
  },
  {
    title: "Customer Support",
    description:
      "Our team is always ready to help you with questions, orders, and anything else you need.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              About ShopEase
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Making online shopping simple and enjoyable.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              ShopEase is an online marketplace created to make it easier for
              you to discover quality products, compare your options, and shop
              from the comfort of your home.
            </p>

            <p className="mt-4 max-w-xl leading-7 text-gray-600">
              From electronics and fashion to home essentials and accessories,
              we bring a wide variety of products together in one convenient
              place.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
              alt="Shopping online"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Mission
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            We put our customers first.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our mission is to create a shopping experience that is convenient,
            trustworthy, and accessible to everyone. We want customers to find
            products they love without making the process complicated.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why Shop With Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Built around your shopping experience
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  ✓
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-4xl font-bold text-gray-900">10K+</p>
            <p className="mt-2 text-gray-600">Happy Customers</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-gray-900">500+</p>
            <p className="mt-2 text-gray-600">Products</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-gray-900">24/7</p>
            <p className="mt-2 text-gray-600">Customer Support</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Explore our collection and discover products selected with you in
            mind.
          </p>

          <a
            href="/shop"
            className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
}
