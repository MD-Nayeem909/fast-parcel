"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import CartDrawer from "@/components/shared/CartDrawer";
const ClientProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
    </QueryClientProvider>
  );
};

export default ClientProvider;
