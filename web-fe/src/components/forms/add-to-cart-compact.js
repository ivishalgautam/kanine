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

export default function AddToCart({ id, moq = 100 }) {
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

  function handleMinus(e) {
    e.preventDefault();
    e.stopPropagation();
    const newCount = count - 1;
    if (newCount < moq) {
      toast.warning(`Minimum order quantity is ${moq}`);
      return moq;
    }

    setCount(newCount);
  }

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    setCount((prev) => prev + 1);
  }

  const handleAddTocart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return toast.warning("Please login first");
    createMutation.mutate({ product_id: id, quantity: count });
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex items-center justify-center gap-1 rounded-md bg-gray-100">
        <Button
          type="button"
          onClick={handleMinus}
          size="icon"
          className="size-8 bg-transparent p-1 text-primary hover:text-white"
        >
          <Minus size={15} />
        </Button>
        <div className="text-center text-xs font-semibold text-gray-500">
          {count}
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          size="icon"
          className="size-8 bg-transparent p-1 text-primary hover:text-white"
        >
          <Plus size={15} />
        </Button>
      </div>

      <div className="flex-1">
        <Button
          variant="primary"
          className="flex items-center justify-center gap-1 py-1 text-xs"
          onClick={(e) => handleAddTocart(e, id)}
          size="xs"
        >
          <ShoppingCart size={15} /> Add
        </Button>
      </div>
    </div>
  );
}
