"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Tag,
} from "lucide-react";
import Link from "next/link";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20 font-bold">Product not found!</div>
    );

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-base-content hover:text-primary mb-8 font-bold transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Gallery
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-base-100/50 p-6 md:p-12 rounded-[3rem] shadow-sm border border-base-100">
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-inner"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="badge badge-primary p-4 font-bold rounded-full shadow-lg shadow-primary/20 uppercase tracking-widest text-[10px]">
                {product.category}
              </span>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-primary">
                  ${product.price}
                </span>
                <div className="h-6 w-px bg-neutral/50"></div>
                <span className="text-neutral font-medium">
                  In Stock • Ready to Deliver
                </span>
              </div>
              <p className="text-neutral leading-relaxed text-lg mb-8">
                {product.description}
              </p>
            </div>

            {/* Features/Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <ShieldCheck className="text-emerald-500" size={24} />
                <span className="text-xs font-bold text-slate-700">
                  1 Year Warranty
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <Truck className="text-blue-500" size={24} />
                <span className="text-xs font-bold text-slate-700">
                  Fast Shipping
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <RefreshCcw className="text-warning" size={24} />
                <span className="text-xs font-bold text-base-content">
                  Easy Returns
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/checkout/${product._id}`}>
                <button className="btn btn-primary btn-lg flex-1 rounded-2xl font-black shadow-xl shadow-primary/25 gap-2">
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              </Link>
              <Link href={`/checkout/${product._id}`}>
                <button className="btn btn-outline btn-secondary btn-lg flex-1 rounded-2xl font-black border-2">
                  Buy It Now
                </button>
              </Link>
            </div>

            <p className="mt-8 text-center md:text-left text-neutral text-sm font-medium italic">
              * Secure payment and 100% satisfaction guaranteed.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
