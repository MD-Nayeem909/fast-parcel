"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle } from "lucide-react";
import axios from "axios";

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/track/${trackingId}`);
      setData(res.data);
    } catch (err) {
      alert("Invalid Tracking ID");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-base-100/40">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Track Your Parcel</h2>
          <p className="text-neutral">
            Enter your tracking ID to see the real-time status.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrack} className="flex gap-2 mb-12">
          <input
            type="text"
            placeholder="Enter Tracking ID (e.g., PKG-12345)"
            className="input input-bordered w-full focus:border-primary"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary px-8"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <Search size={20} />
            )}
            Track
          </button>
        </form>

        {/* Tracking Result Visualizer */}
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-base-200 p-8 rounded-box shadow-inner"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-sm opacity-70">
                    Parcel ID: {data.trackingId}
                  </p>
                  <h3 className="text-xl font-bold">Status: {data.status}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-70">Estimated Delivery</p>
                  <p className="font-semibold">
                    {data.estimatedDate || "Calculating..."}
                  </p>
                </div>
              </div>

              {/* Progress Stepper */}
              <ul className="steps steps-vertical lg:steps-horizontal w-full">
                <li
                  className={`step ${
                    data.status === "Pending" || "step-primary"
                  }`}
                >
                  Ordered
                </li>
                <li
                  className={`step ${
                    ["Picked", "On the way", "Delivered"].includes(data.status)
                      ? "step-primary"
                      : ""
                  }`}
                >
                  Picked
                </li>
                <li
                  className={`step ${
                    ["On the way", "Delivered"].includes(data.status)
                      ? "step-primary"
                      : ""
                  }`}
                >
                  In Transit
                </li>
                <li
                  className={`step ${
                    data.status === "Delivered" ? "step-primary" : ""
                  }`}
                >
                  Delivered
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
