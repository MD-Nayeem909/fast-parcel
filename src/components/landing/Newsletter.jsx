"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};
const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
const Newsletter = () => {
  return (
    <div className="relative font-sans w-full flex items-center justify-center overflow-hidden p-4 transition-colors duration-300">
      <motion.div
        className="relative z-10 container mx-auto text-center max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {}

        <motion.h2
          className="text-3xl sm:text-5xl lg:text-4xl font-bold text-base-content tracking-tight leading-tight"
          variants={itemVariants}
        >
          Ready to ship?
        </motion.h2>

        {}

        <motion.p
          className="mt-4 text-lg text-neutral max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Create an account and start shipping in minutes.
        </motion.p>

        {}

        <motion.form
          className="mt-10 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
          variants={itemVariants}
        >
          <div className="relative flex flex-col sm:flex-row items-center bg-base-100/50 backdrop-blur-sm p-2 rounded-4xl md:rounded-full shadow-lg border border-primary/80 group focus-within:ring-2 focus-within:ring-primary  transition-all duration-300">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral hidden sm:block" />

            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full sm:w-auto grow bg-transparent sm:pl-12 px-4 py-3 text-base-content  placeholder:text-neutral outline-none text-center sm:text-left"
              required
            />

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3 bg-primary font-semibold rounded-full transition-colors duration-300 shadow-md transform group-hover:scale-105"
            >
              Get Notified <ArrowRight />
            </button>
          </div>
        </motion.form>

        {}

        <motion.div
          className="mt-8 flex items-center justify-center space-x-3"
          variants={itemVariants}
        >
          <div className="flex -space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 1"
            />

            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User 2"
            />

            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt="User 3"
            />
          </div>

          <p className="text-neutral">
            <span className="font-semibold text-base-content">10k+</span> joined
            already
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default function NewsletterSection() {
  return <Newsletter />;
}
