"use client";
import ProductCard from "./cards/product";
import { P } from "./ui/typography";
import Spinner from "./Spinner";

export default function Products({ products }) {
  return (
    <div className="container space-y-4 py-4">
      <ul className="flex items-center justify-start gap-4 border-b"></ul>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {!products?.length ? (
          <P>Not found!</P>
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
