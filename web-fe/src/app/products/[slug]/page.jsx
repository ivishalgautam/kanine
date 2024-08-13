import ProductCard from "@/components/cards/product";
import AddToCart from "@/components/forms/add-to-cart";
import ProductSlideshow from "@/components/product-slideshow";
import { Button } from "@/components/ui/button";
import { H1, H3, Large, P, Small } from "@/components/ui/typography";
import { formatCurrency } from "@/lib/intl";
import { fetchProduct } from "@/utils/api";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params: { slug } }) {
  const { data } = await fetchProduct(slug);
  return {
    title: data?.meta_title ?? data?.title,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    openGraph: {
      images: data?.pictures,
    },
  };
}

export default async function Page({ params: { slug } }) {
  const { data } = await fetchProduct(slug);
  console.log({ data });
  return (
    <section className="py-14">
      <div className="container space-y-10">
        <div className="rounded-md bg-white">
          <div className="grid grid-cols-6 gap-10 lg:gap-20">
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <ProductSlideshow images={data?.pictures} />
            </div>

            {/* details */}
            <div className="col-span-6 space-y-10 divide-y md:col-span-3 lg:col-span-4">
              <div className="space-y-2">
                <div
                  className={
                    "text-sm font-medium uppercase tracking-wider text-primary"
                  }
                >
                  {data?.brand?.[0].name}
                </div>
                <H1 className={"border-none font-bold"}>{data?.title}</H1>
                {/* {Array.isArray(data?.custom_description) &&
                    data?.custom_description?.map((cd, ind) => (
                      <div key={ind}>
                        <span className="font-bold capitalize">{cd.key}</span>:{" "}
                        <span>{cd.value}</span>
                      </div>
                    ))} */}
                <div
                  className="prose prose-sm prose-p:m-0 py-6"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></div>

                <div className="text-2xl font-semibold">
                  {formatCurrency(
                    data?.price ?? Math.round(Math.random() * 99999),
                  )}
                </div>
                <div className="pt-4">
                  <AddToCart id={data?.id} moq={data?.moq} />
                </div>
              </div>

              <div className="py-6">
                <div>
                  <span className="text-sm font-normal capitalize">SKU: </span>
                  <span className="text-sm font-normal text-gray-400">
                    {data?.sku}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-normal capitalize">
                    Categories:{" "}
                  </span>
                  <div className="inline-flex items-center justify-start gap-1">
                    {Array.isArray(data?.categories) &&
                      data?.categories
                        ?.filter((ele, ind, self) => {
                          return ind === self.findIndex((t) => t.id === ele.id);
                        })
                        .map(({ id, slug, name }) => (
                          <Link
                            href={`/categories/${slug}`}
                            className="text-sm font-normal capitalize text-gray-400 transition-colors hover:text-primary"
                            key={id}
                          >
                            {name}
                            {data?.categories?.length > 1 &&
                            data?.categories[data?.categories?.length - 1]
                              .id !== id
                              ? ","
                              : ""}
                          </Link>
                        ))}
                  </div>
                </div>
                <div>
                  <div>
                    <span className="text-sm font-normal capitalize">
                      Tags:{" "}
                    </span>
                    <span className="text-sm font-normal text-gray-400">
                      {data?.tags.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* description */}
        {/* {data?.description && (
          <div className="rounded-md bg-white p-8">
            <div className="border-b">
              <Button className="rounded-none border-b-2 border-primary bg-transparent p-0 pb-2 text-lg text-primary hover:bg-transparent">
                Description
              </Button>
            </div>
            <div
              className="py-6"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
        )} */}

        {Array.isArray(data?.custom_description) &&
          data?.custom_description?.map((cd, ind) => (
            <div key={ind}>
              <span className="font-bold capitalize">{cd.key}</span>:{" "}
              <span>{cd.value}</span>
            </div>
          ))}

        {/* related products */}
        <div>
          <div className="border-b">
            <Button className="relative rounded-none bg-transparent p-0 pb-2 text-2xl font-semibold text-black before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-1/2 before:bg-primary hover:bg-transparent">
              Related products
            </Button>
          </div>
          {data?.related_products?.length ? (
            <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {data?.related_products?.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <P>No related products.</P>
          )}
        </div>
      </div>
    </section>
  );
}
