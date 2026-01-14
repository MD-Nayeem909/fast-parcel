import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <div className="py-20 bg-neutral text-neutral-content">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Ready to ship?</h2>
          <p className="text-lg opacity-80">
            Create an account and start shipping in minutes.
          </p>
        </div>
        <Link href="/register" className="btn btn-primary btn-lg gap-2">
          Get Started <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default CTA;
