"use client";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { MainContext } from "@/store/context";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}`, data);
};

export default function AddToCart({ id, moq }) {
  const { user } = useContext(MainContext);
  const [count, setCount] = useState(moq);
  const queryClient = useQueryClient();
  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart-items");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleAddTocart = async (id) => {
    if (!user) return toast.warning("Please login first");
    createMutation.mutate({ product_id: id, quantity: count });
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-5 flex items-center justify-center gap-1 rounded-md bg-gray-100 p-1.5 sm:col-span-4 md:col-span-4 lg:col-span-2">
        <Button
          type="button"
          onClick={() => {
            const newCount = count - 1;
            if (newCount < moq) {
              toast.warning(`Minimum order quantity is ${moq}`);
              return moq;
            }

            setCount(newCount);
          }}
          size="icon"
          className="bg-transparent text-primary hover:text-white"
        >
          <Minus />
        </Button>
        <div className="text-center font-semibold text-gray-500">{count}</div>
        <Button
          type="button"
          onClick={() => setCount((prev) => prev + 1)}
          size="icon"
          className="bg-transparent text-primary hover:text-white"
        >
          <Plus />
        </Button>
      </div>

      <div className="col-span-7 sm:col-span-8 md:col-span-8">
        <Button
          variant="primary"
          className="flex h-full w-full items-center justify-center gap-1 text-sm md:text-lg lg:col-span-10"
          onClick={() => handleAddTocart(id)}
        >
          <ShoppingCart size={25} /> &nbsp; <span>Add to cart</span>
        </Button>
      </div>
    </div>
  );
}
