"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Package, Truck, CheckCircle, MapPin } from "lucide-react";

export default function TrackingPage() {
  const { id } = useParams();

  const {
    data: parcel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tracking", id],
    queryFn: async () => {
      const res = await fetch(`/api/parcels/${id}`);
      if (!res.ok) throw new Error("Parcel not found");
      return res.json();
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-error">Tracking Not Found</h1>
        <p>Could not find parcel with ID: {id}</p>
        <Link href="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="btn btn-ghost gap-2">
            &larr; Back
          </Link>
          <span
            className={`badge badge-lg capitalize ${
              parcel.status === "delivered" ? "badge-success" : "badge-primary"
            }`}
          >
            {parcel.status}
          </span>
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-2">
              Tracking ID: {parcel.trackingId}
            </h2>
            <p className="text-gray-500 mb-6">
              Estimated Delivery: 3-5 Business Days
            </p>

            {/* Timeline */}
            <ul className="steps steps-vertical md:steps-horizontal w-full overflow-x-auto">
              {/* Logic to map status to steps */}
              {["pending", "picked", "in-transit", "delivered"].map((step) => {
                const stepIndex = [
                  "pending",
                  "picked",
                  "in-transit",
                  "delivered",
                ].indexOf(step);
                const currentIndex = [
                  "pending",
                  "picked",
                  "in-transit",
                  "delivered",
                  "cancelled",
                ].indexOf(parcel.status);
                // If cancelled, show red or stop? For now just show progress up to cancellation
                const isCompleted =
                  parcel.status !== "cancelled" && currentIndex >= stepIndex;

                return (
                  <li
                    key={step}
                    className={`step ${
                      isCompleted ? "step-primary" : ""
                    } capitalize`}
                  >
                    {step}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Package size={20} /> Shipment Details
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {parcel.description}
                </p>
                <p>
                  <span className="font-semibold">From:</span>{" "}
                  {parcel.senderInfo?.name}
                </p>
                <p>
                  <span className="font-semibold">To:</span>{" "}
                  {parcel.receiverInfo?.name}
                </p>
                <p>
                  <span className="font-semibold">Cost:</span> ${parcel.cost}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Truck size={20} /> History
              </h3>
              <ul className="space-y-4">
                {parcel.statusHistory
                  ?.slice()
                  .reverse()
                  .map((history, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        {idx !== parcel.statusHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-base-300 my-1"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold capitalize">{history.status}</p>
                        <p className="text-sm opacity-70">{history.note}</p>
                        <p className="text-xs opacity-50">
                          {format(new Date(history.timestamp), "MMM d, h:mm a")}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
