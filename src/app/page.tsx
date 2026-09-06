import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/categories";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}