import React from "react";
import FadeIn from "../motion/FadeIn";
import { Globe, ShieldCheck, Truck, Zap } from "lucide-react";

const services = [
  {
    title: "Standard Delivery",
    desc: "Reliable delivery within 3-5 days.",
    icon: Truck,
  },
  {
    title: "Express Shipping",
    desc: "Urgent delivery within 24 hours.",
    icon: Zap,
  },
  {
    title: "Secure Handling",
    desc: "Special care for fragile items.",
    icon: ShieldCheck,
  },
  {
    title: "Global Reach",
    desc: "Send parcels across 50+ countries.",
    icon: Globe,
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-base-100/40">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 border-base-300 shadow-sm hover:shadow-xl transition-all"
            >
              <FadeIn>
                <div className="card-body items-center text-center">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="card-title">{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
