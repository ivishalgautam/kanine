"use client";
import ProductCard from "./cards/product";
import { H3, H5, H6, Muted, P } from "./ui/typography";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import Image from "next/image";

let price = 99999;
const products = [
  {
    name: "tino tee",
    image: "/images/products/tino-tee.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "webbing collar",
    image: "/images/products/webbing-leash.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "heritage polo",
    image: "/images/products/heritage-polo.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "webbing leash",
    image: "/images/products/webbing-leash.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "flag collar polo",
    image: "/images/products/flag-collar-polo.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "flag collar polo",
    image: "/images/products/flag-collar-polo-2.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "colour block harness",
    image: "/images/products/colour-block-harness.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "webbing leash",
    image: "/images/products/webbing-leash.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "flag collar polo",
    image: "/images/products/flag-collar-polo.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "flag collar polo",
    image: "/images/products/flag-collar-polo-2.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "colour block harness",
    image: "/images/products/colour-block-harness.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
  {
    name: "webbing leash",
    image: "/images/products/webbing-leash.jpg",
    brand: "tommy hilfiger",
    price: Math.round(Math.random() * price),
  },
];

const fetchProducts = async () => {
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, 3000 * 1),
  );
  return products;

  const { data } = await http().get(
    `${endpoints.products.getAll}?featured=true`,
  );
  return data;
};

export default function FeaturedProducts() {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchProducts,
  });

  console.log({ data });

  // if (isFetching && isLoading) return <Spinner />;
  if (isError) return error.message ?? "error";

  return (
    <div className="container space-y-4 py-4">
      <H5 className={"text-center font-normal uppercase"}>
        <span className="border-b-2 border-primary py-3"> </span>
        Featured products
      </H5>
      <div className="grid grid-cols-2 gap-4 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isLoading &&
          Array.from({ length: 12 }).map((_, ind) => <LoaderCard key={ind} />)}
        {!data?.length ? (
          <Muted className={"col-span-6 mx-auto"}>No Products found!</Muted>
        ) : (
          data
            ?.slice(0, 12)
            ?.map((product) => (
              <ProductCard key={product.price} product={product} />
            ))
        )}
      </div>
    </div>
  );
}

export function LoaderCard() {
  return (
    <div className="space-y-3">
      <div className="size-52 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="space-y-1">
        <div className="mx-auto h-4 w-3/4 rounded-full bg-gray-100"></div>
        <div className="mx-auto h-3 w-2/4 rounded-full bg-gray-100"></div>
        <div className="mx-auto h-4 w-2/4 rounded-full bg-gray-100"></div>
      </div>
    </div>
  );
}
