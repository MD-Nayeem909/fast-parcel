"use client";
import React, { useState } from "react";
import { useCart } from "@/provider/CartProvider";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    // Note: Since we need to checkout multiple items, we create a specialized
    // payload or handle checkout of individual items if the backend only supports one.
    // Assuming backend checkout takes a `product` object: For a full multi-item cart
    // you would normally send the whole cartItems array to a /api/checkout/cart route.
    // For now, checkout the first item or let the user know.

    try {
      // Temporary: Checkout the first item in the cart if it's a single-item API
      if (cartItems.length > 0) {
         const res = await fetch("/api/checkout", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ product: cartItems[0] }),
         });
         const data = await res.json();
         if (data.url) {
           window.location.href = data.url;
         } else {
           setIsCheckoutLoading(false);
         }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setIsCheckoutLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center">
        <div className="bg-base-200 p-8 rounded-full mb-6">
          <ShoppingBag size={64} className="text-neutral/50" />
        </div>
        <h1 className="text-3xl font-black mb-4">Your cart is empty</h1>
        <p className="text-neutral mb-8">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link href="/products" className="btn btn-primary rounded-2xl px-8 shadow-xl shadow-primary/20">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 md:py-20 bg-base-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3">
            <ShoppingBag className="text-primary" size={32} /> Your Cart
          </h1>
          <button
             onClick={clearCart}
             className="btn btn-ghost text-error btn-sm font-bold"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-base-200/50 rounded-3xl border border-base-200 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-32 h-32 object-cover rounded-2xl bg-base-100"
                />
                
                <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-xs text-neutral tracking-wider uppercase font-semibold mb-2">{item.category}</p>
                    <span className="font-black text-primary text-xl">${item.price}</span>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-base-100 rounded-xl p-1 shadow-inner">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="btn btn-square btn-sm btn-ghost"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="btn btn-square btn-sm btn-ghost"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-200 shadow-sm sticky top-24">
              <h2 className="text-xl font-black mb-6 pb-4 border-b border-base-300">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral">
                  <span>Subtotal</span>
                  <span className="font-bold text-base-content">${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral">
                  <span>Shipping</span>
                  <span className="font-bold text-success">Free</span>
                </div>
                <div className="border-t border-base-300 pt-4 flex justify-between items-center mt-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-black text-3xl text-primary">${getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                loading={isCheckoutLoading}
                className="w-full mb-4 py-4 rounded-2xl shadow-xl shadow-primary/20 text-lg"
              >
                Proceed to Checkout
              </Button>
              
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 text-neutral hover:text-primary transition-colors text-sm font-bold"
              >
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
