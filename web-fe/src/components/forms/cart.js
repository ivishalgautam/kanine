import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { Input } from "../ui/input";
import { Muted, Small } from "../ui/typography";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

const deleteCartItem = ({ id }) => {
  return http().delete(`${endpoints.cart.getAll}/${id}`);
};

export default function CartForm({ data, handleCreate }) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const deleteMutation = useMutation(deleteCartItem, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("cart-items");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleDelete = ({ id }) => {
    deleteMutation.mutate({ id });
  };

  const onSubmit = (data) => {
    handleCreate(data.items);
  };

  useEffect(() => {
    // remove();
    setValue(
      "items",
      data?.map((prd) => ({
        _id: prd.id,
        product_id: prd.product_id,
        title: prd.title,
        image: prd.pictures[0],
        quantity: prd.quantity,
        brand: prd.brand,
        moq: prd.moq,
      })),
    );
  }, [data]);

  return (
    <div className="rounded-md bg-white p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableCaption>{fields?.length === 0 && "Empty"}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields?.map((field, key) => (
              <TableRow key={field.id}>
                <TableCell>
                  <div className="relative size-14 overflow-hidden rounded-md">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${field.image}`}
                      fill
                      alt={field.title}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>{field.title}</div>
                  <Muted className={"text-xs uppercase text-gray-400"}>
                    {field.brand}
                  </Muted>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1 rounded-md">
                    <Button
                      type="button"
                      onClick={() =>
                        setValue(
                          `items.${key}.quantity`,
                          watch(`items.${key}.quantity`) - 1,
                        )
                      }
                      size="icon"
                      className="size-8 border border-primary bg-transparent p-1 text-primary hover:text-white"
                    >
                      <Minus size={15} />
                    </Button>
                    <div className="text-center text-xs font-semibold text-gray-500">
                      <Input
                        type="number"
                        {...register(`items.${key}.quantity`, {
                          required: "required",
                          valueAsNumber: true,
                          validate: (value) => {
                            if (value < field.moq) {
                              return `Minimum order quantity is '${field.moq}'`;
                            }
                          },
                        })}
                        placeholder="Enter quantity"
                        className="w-auto"
                      />
                      {errors?.items?.[key] && (
                        <Small className={"text-red-500"}>
                          {errors.items[key]?.["quantity"].message}
                        </Small>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={() =>
                        setValue(
                          `items.${key}.quantity`,
                          watch(`items.${key}.quantity`) + 1,
                        )
                      }
                      size="icon"
                      className="size-8 border border-primary bg-transparent p-1 text-primary hover:text-white"
                    >
                      <Plus size={15} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete({ id: field._id })}
                  >
                    <MdDelete size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {fields?.length > 0 && (
          <div className="text-end">
            <Button type="submit">Submit query</Button>
          </div>
        )}
      </form>
    </div>
  );
}
