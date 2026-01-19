"use client";
import React from "react";
import { motion } from "framer-motion";

const ProductSkeleton = () => {
  return (
    <div className="bg-slate-50 rounded-[2.5rem] p-4 border border-slate-100 w-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square overflow-hidden rounded-4xl bg-slate-200 mb-6"></div>

      {/* Content Skeleton */}
      <div className="px-2 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-200 rounded-lg w-2/3"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/4"></div>
        </div>
        
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
          <div className="h-4 bg-slate-200 rounded-lg w-5/6"></div>
        </div>

        <div className="h-14 bg-slate-200 rounded-3xl w-full mt-4"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;