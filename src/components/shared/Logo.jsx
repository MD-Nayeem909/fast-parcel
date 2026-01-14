import { Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <section className="flex items-center">
      <Link href="/" className="flex items-center space-x-2 group">
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
          <span className="text-white font-bold text-base sm:text-lg lg:text-xl">
            <Truck />
          </span>
        </div>
        <span className="font-bold text-lg sm:text-xl lg:text-2xl text-primary">
          FastParcel
        </span>
      </Link>
    </section>
  );
};

export default Logo;
