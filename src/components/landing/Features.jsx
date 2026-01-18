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
    <section id="features" className="">
      <FadeIn>
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl lg:text-4xl font-bold text-base-content tracking-tight leading-tight">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-lg text-neutral max-w-2xl mx-auto">
            We provide end-to-end logistics solutions tailored to your needs.
          </p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-100/50 shadow-md border border-base-100 hover:bg-base-100 hover:shadow-xl transition-all"
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
