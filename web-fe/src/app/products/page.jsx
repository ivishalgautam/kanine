"use client";
import PaginationControls from "@/components/PaginationControls";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useSearchParams } from "next/navigation";
import Products from "@/components/products";

const fetchProducts = async (page = 1, limit, categories, brands, part) => {
  const urlParams = new URLSearchParams();

  // if (part) {
  //   urlParams.append("type", part);
  // }
  // if (categories) {
  //   urlParams.append("categories", categories);
  // }
  // if (brands) {
  //   urlParams.append("brands", brands);
  // }
  
  if (page) {
    urlParams.append("page", Math.max(1, page));
  }
  if (limit) {
    urlParams.append("limit", limit);
  }

  const url = `${endpoints.products.getAll}?${urlParams.toString()}`;
  return await http().get(url);
};

export default function Page() {
  const searchParams = useSearchParams();
  const currPage = searchParams.get("page");
  const limit = searchParams.get("limit");
  const categories = searchParams.get("categories");
  const brands = searchParams.get("brands");
  const part = searchParams.get("part");

  const { data } = useQuery({
    queryKey: ["products", currPage, limit],
    queryFn: () => fetchProducts(currPage, limit),
    // enabled: false,
  });

  console.log({ data });

  return (
    <section className="py-6">
      <div className="container">
        <div>
          <Products products={data?.data} />
        </div>
        <div>
          <PaginationControls total_page={data?.total_page} />
        </div>
      </div>
    </section>
  );
}
