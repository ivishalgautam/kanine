import Hero from "@/components/Hero";
import Press from "@/components/press";
import Brands from "@/components/brands";
import { OfficialPartners } from "@/components/official-partners";
import FeaturedCategories from "@/components/featured-categories";
import FeaturedProducts from "@/components/featured-products";

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <FeaturedCategories />
      <Brands />
      <FeaturedProducts />
      <OfficialPartners />
      <Press />
      {/* <ProductsWithTabs /> */}
    </div>
  );
}
