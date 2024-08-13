"use client";
import Image from "next/image";
import { H6 } from "../ui/typography";
import AddToCart from "../forms/add-to-cart-compact";
import Link from "next/link";
import { formatCurrency } from "@/lib/intl";

export default function ProductCard({ product }) {
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;
  return (
    <Link href={`/products/graphic-tee`}>
      <div className="group cursor-pointer space-y-2">
        <figure className="relative overflow-hidden">
          <Image
            src={product.image ?? `${baseImageUrl}/${product?.pictures?.[0]}`}
            width={500}
            height={500}
            alt={product.name}
            className="rounded-md"
          />
          <div className="absolute -bottom-full right-2 z-10 transition-all group-hover:bottom-2">
            <AddToCart id={product.id} />
          </div>
        </figure>
        <div>
          <H6 className={"text-center font-medium text-gray-600"}>
            {product.name ?? product.title}
          </H6>
          <div className="rounded-full text-center text-xs capitalize tracking-wide text-primary">
            {product.brand}
          </div>
          <div className="text-center text-sm font-medium">
            {formatCurrency(product.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}
