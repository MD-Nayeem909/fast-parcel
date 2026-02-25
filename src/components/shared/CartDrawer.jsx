"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/provider/CartProvider";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "./../ui/Button";

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-1000 backdrop-blur-sm"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-base-100 border-l border-base-200 z-1001 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-base-200 bg-base-100">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <ShoppingBag className="text-primary" size={24} />
                Shopping Cart
              </h2>
              <button
                onClick={closeCart}
                className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-base-100/50">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="bg-base-200 p-6 rounded-full mb-2">
                    <ShoppingBag size={48} className="text-neutral/50" />
                  </div>
                  <h3 className="text-xl font-bold">Your cart is empty</h3>
                  <p className="text-neutral text-sm max-w-[250px]">
                    Looks like you haven&apos;t added any products to your cart yet.
                  </p>
                  <button
                    onClick={closeCart}
                    className="btn btn-outline btn-primary rounded-full px-8 mt-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 items-center bg-base-100 p-4 rounded-3xl border border-base-200 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-2xl bg-base-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-primary font-black mt-1">${item.price}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-base-200 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="btn btn-square btn-xs btn-ghost rounded-md"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="btn btn-square btn-xs btn-ghost rounded-md"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="btn btn-square btn-ghost btn-xs text-error hover:bg-error/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-base-100 border-t border-base-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-neutral text-sm font-medium">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral text-sm font-medium">
                    <span>Shipping</span>
                    <span className="text-success">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-base-content text-lg font-black pt-3 border-t border-base-200">
                    <span>Total</span>
                    <span className="text-primary">
                      ${getCartTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleCheckout}
                    loading={isCheckoutLoading}
                    className="w-full py-4 rounded-xl shadow-lg shadow-primary/20 flex justify-center items-center gap-2"
                  >
                    Checkout <ArrowRight size={18} />
                  </Button>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="btn btn-outline btn-block rounded-xl border-2 hover:bg-base-200"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
