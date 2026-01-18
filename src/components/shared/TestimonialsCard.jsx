import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsCard = ({ item, index, activeIndex, totalCards }) => {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }
  const isVisible = Math.abs(offset) <= 1;
  const isActive = offset === 0;
  const animate = {
    x: `${offset * 70}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    rotateY: offset * 15,
    filter: isActive ? "blur(0px) brightness(1)" : "blur(4px) brightness(0.6)",
    opacity: isVisible ? 1 : 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 25,
    },
  };
  return (
    <motion.div
      className="absolute w-70 md:w-87.5 h-90 md:h-110"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      animate={animate}
    >
      <div className="relative w-full h-full rounded-[2.5rem] shadow-2xl overflow-hidden bg-base-200 border-2 border-base-300">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full opacity-10 object-cover pointer-events-none"
          onError={(e) => {
            const target = e.target;
            target.onerror = null;
            target.src = anonymousFallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-200/20 to-transparent flex flex-col justify-center p-4">
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-30 h-30 mb-4 rounded-full object-cover"
              onError={(e) => {
                const target = e.target;
                target.onerror = null;
                target.src = anonymousFallbackImage;
              }}
            />
            <div>
              <p className="font-semibold text-base-content">{item.name}</p>
              <p className="text-primary text-xs font-bold uppercase tracking-widest">
                {item.role}
              </p>
            </div>
          </div>
          <p className="text-base-content text-center text-sm mb-3 italic">
            "{item.content}"
          </p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={20} className="fill-primary text-primary" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsCard;
