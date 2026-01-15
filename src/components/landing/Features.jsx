import React from "react";
import { Globe, Package, ShieldCheck } from "lucide-react";
import FadeIn from "../motion/FadeIn";

const Features = () => {
  const features = [
    {
      title: "Global Reach",
      desc: "Deliver to over 200 countries with our extensive network partners.",
      icon: Globe,
    },
    {
      title: "Secure Handling",
      desc: "Special care for fragile items.",
      icon: ShieldCheck,
    },
    {
      title: "Standard Delivery",
      desc: "Reliable delivery within 3-5 days.",
      icon: Package,
    },
  ];
  return (
    <section id="features" className="py-20 bg-base-100/40 container mx-auto px-4">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-neutral max-w-2xl mx-auto">
            We provide end-to-end logistics solutions tailored to your needs.
          </p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md border border-base-300 hover:shadow-xl transition-all"
          >
            <div className="card-body items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
