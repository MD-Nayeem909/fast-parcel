"use client";

import Services from "@/components/landing/Services";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import Tracking from "@/components/landing/Tracking";
import NewsletterSection from "@/components/landing/Newsletter";

export default function Home() {
  return (
    <div className="bg-base-100/40 space-y-20">
      <Hero />
      <div className="space-y-20 px-4">
        <Tracking />
        <Services />
        <Features />
        <NewsletterSection />
        <Pricing />
        <Testimonials />
      </div>
    </div>
  );
}
