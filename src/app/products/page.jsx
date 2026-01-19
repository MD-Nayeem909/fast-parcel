"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import CustomFilter from "@/components/ui/CustomFilter";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = products;

    if (selectedCategory !== "All") {
      temp = temp.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, products]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100/50 pb-20">
      {/* Header & Filter Section */}
      <div className="py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black text-base-content mb-8 tracking-tighter italic">
            OUR <span className="text-primary">COLLECTION</span> 
          </h1>

          <div className="flex flex-col md:flex-row gap-4 items-center bg-base-100 p-4 rounded-3xl shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <CustomFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-100">
          <AnimatePresence mode="popLayout">
            {currentItems.map((product) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-base-100/50 border shadow border-base-100 rounded-4xl p-4 hover:shadow-xl transition-all group"
              >
                <div className="relative aspect-square overflow-hidden rounded-3xl mb-4 bg-base-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-widest">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-base-content truncate">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl font-black text-primary">
                    ${product.price}
                  </span>
                  <Link
                    href={`/products/${product._id}`}
                    className="btn btn-circle btn-ghost text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results found */}
        {currentItems.length === 0 && (
          <div className="text-center py-20 rounded-[3rem]">
            <p className="text-neutral font-bold text-xl">
              No products matched your search.
            </p>
          </div>
        )}

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-4 rounded-2xl bg-base-100 hover:bg-primary hover:text-white disabled:opacity-30 transition-all font-bold flex items-center gap-2"
            >
              <ChevronLeft size={20} /> Prev
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-base-100 text-neutral hover:bg-base-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-4 rounded-2xl bg-base-100 hover:bg-primary hover:text-white disabled:opacity-30 transition-all font-bold flex items-center gap-2"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
