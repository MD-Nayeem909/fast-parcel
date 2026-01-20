"use client";

import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-base-200/50 p-10 rounded-[3rem] shadow-2xl shadow-primary/10 text-center border border-primary/10"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-success/10 p-4 rounded-full">
            <CheckCircle size={64} className="text-success" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-base-content mb-4">
          Payment Success!
        </h1>
        <p className="text-neutral mb-8 font-medium">
          Thank you for your purchase. Your order has been placed successfully
          and is being processed.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/customer/my-products"
            className="btn btn-primary btn-lg rounded-2xl font-black gap-2"
          >
            <Package size={20} /> View My Orders
          </Link>
          <Link href="/" className="btn btn-ghost font-bold gap-2">
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
