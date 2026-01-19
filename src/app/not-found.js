"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200/50 px-4 overflow-hidden">
      {/* Background Decor (Optional) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center max-w-2xl">
        {/* Animated Number */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[150px] md:text-[220px] font-black leading-none text-base-content/30 select-none"
        >
          404
        </motion.h1>

        {/* Floating Icon */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-base-100 shadow-2xl rounded-3xl flex items-center justify-center text-primary border border-base-300"
        >
          <Search size={48} strokeWidth={2.5} />
        </motion.div>

        <div className="mt-8 space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-black text-base-content uppercase italic tracking-tighter"
          >
            Lost in <span className="text-primary">Space?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral font-medium text-lg max-w-md mx-auto"
          >
            The page you are looking for does&apos;t exist or has been moved to
            a new destination.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link
            href="/"
            className="btn btn-primary btn-lg rounded-2xl px-10 font-black gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            <Home size={20} /> Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost btn-lg rounded-2xl px-10 font-black text-neutral hover:bg-base-200 gap-2"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </motion.div>
      </div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-10 text-neutral font-bold uppercase tracking-[0.3em] text-[10px]"
      >
        <span className="hover:text-primary ease-in-out duration-500">
          FastParcel
        </span>{" "}
        • All Rights Reserved
      </motion.p>
    </div>
  );
};

export default NotFound;
