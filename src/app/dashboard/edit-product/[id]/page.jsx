"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import {
  Edit,
  ImageIcon,
  Tag,
  DollarSign,
  AlignLeft,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const EditProduct = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setValue("title", data.title);
          setValue("category", data.category);
          setValue("price", data.price);
          setValue("image", data.image);
          setValue("description", data.description);
        } else {
          toast.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchProductData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/my-products");
        router.refresh();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="p-10 text-center font-bold">Loading product info...</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        href="/dashboard/my-products"
        className="flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition-colors font-semibold"
      >
        <ArrowLeft size={18} /> Back to My Products
      </Link>

      <div className="bg-base-100/50 rounded-[2.5rem] p-8 shadow-sm border border-base-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Edit size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Edit Product</h1>
            <p className="text-sm text-slate-500 font-medium">
              Update your product information and listings.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-bold mb-2 flex gap-2">
              <Tag size={16} /> Title
            </label>
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full rounded-xl"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-bold mb-2 flex gap-2">
              <Tag size={16} /> Category
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full rounded-xl"
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Software">Software</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-bold mb-2 flex gap-2">
              <DollarSign size={16} /> Price
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full rounded-xl"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-bold mb-2 flex gap-2">
              <ImageIcon size={16} /> Image URL
            </label>
            <input
              {...register("image", { required: true })}
              className="input input-bordered w-full rounded-xl"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-bold mb-2 flex gap-2">
              <AlignLeft size={16} /> Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full h-32 rounded-xl"
            />
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary px-10 rounded-xl ${
                loading ? "loading" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
