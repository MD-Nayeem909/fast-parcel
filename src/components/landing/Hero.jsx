import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FadeIn from "../motion/FadeIn";

const Hero = () => {
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();
  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/tracking/${trackingId}`);
    }
  };
  return (
    <div
      className="hero min-h-150"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/4391478/pexels-photo-4391478.jpeg)",
      }}
    >
      <div className="hero-overlay bg-black backdrop-blur-lg opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Reliable Delivery, <span className="text-primary">Every Time</span>
          </h1>
          <FadeIn>
            <p className="mb-8 text-lg text-gray-200">
              Experience the fastest and most secure parcel delivery service.
              Track your shipments in real-time and manage your logistics with
              ease.
            </p>
          </FadeIn>

          <div className="card bg-base-100/80 shadow-xl p-2 max-w-lg mx-auto">
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g. TRK12345)"
                className="input input-bordered border shadow-lg focus:shadow-xl focus:outline-none border-neutral/40 focus:ring-primary bg-base-100 rounded-l-full w-full text-base-content"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary rounded-r-full">
                Track
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
