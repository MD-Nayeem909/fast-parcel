"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Check } from "lucide-react";

const CustomFilter = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["All", "Electronics", "Fashion", "Software", "Service"];

  return (
    <div className="relative w-full md:w-64">
      {/* Label / Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between pl-12 pr-6 py-4 rounded-2xl bg-base-200 border border-transparent hover:border-primary/50 focus:outline-none font-bold text-base-content cursor-pointer transition-all active:scale-95 shadow-sm relative"
      >
        <Filter
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral"
          size={18}
        />

        <span className="text-sm uppercase tracking-wide">
          {selectedCategory === "All" ? "All Categories" : selectedCategory}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} className="text-neutral" />
        </motion.div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            ></div>

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-20 w-full mt-2 bg-base-100 rounded-b-3xl shadow-2xl border border-base-100 overflow-hidden py-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-6 py-3.5 text-sm font-bold transition-colors hover:bg-base-300 ${
                    selectedCategory === category
                      ? "text-primary bg-primary/10"
                      : "text-neutral"
                  }`}
                >
                  {category === "All" ? "All Categories" : category}

                  {selectedCategory === category && (
                    <motion.div layoutId="activeCheck">
                      <Check size={16} strokeWidth={3} />
                    </motion.div>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomFilter;
