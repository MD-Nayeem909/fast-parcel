"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Loading from "@/app/loading";
import OrderCard from "@/components/card/OrderCard";

const CustomerProducts = () => {
  const { data: session } = useSession();
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(purchasedItems);
  

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!session?.user?.id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/user/${session.user.id}`);
        const data = await res.json();
        setPurchasedItems(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [session]);

  

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="p-4 md:p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-base-content flex items-center gap-3">
          <ShoppingBag className="text-primary" /> My Purchases
        </h1>
        <p className="text-neutral font-medium">
          View and manage the products you&apos;ve bought.
        </p>
      </div>

      {purchasedItems?.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedItems.map((item) => (
            <OrderCard key={item._id} order={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100/50 rounded-[3rem] border-2 border-dashed border-base-100">
          <div className="w-20 h-20 bg-base-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShoppingBag className="text-neutral" size={40} />
          </div>
          <h3 className="text-xl font-bold text-base-content">
            No purchases yet
          </h3>
          <p className="text-neutral mb-6">
            Explore our gallery and find amazing products!
          </p>
          <Link href="/products" className="btn btn-primary rounded-xl px-8">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CustomerProducts;
