
import React from "react";
import { motion, PanInfo } from "framer-motion";

const TestimonialsCard = ({ card, index, activeIndex, totalCards }) => {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }
  const isVisible = Math.abs(offset) <= 1;
  const animate = {
    x: `${offset * 50}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    },
  };
  return (
    <motion.div
      className="absolute w-1/2 md:w-1/3 h-[95%]"
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden bg-gray-200 dark:bg-neutral-800">
        <img
          src={card.imageUrl}
          alt={card.title}
          className="w-full h-full object-cover pointer-events-none"
          onError={(e) => {
            const target = e.target;
            target.onerror = null;
            target.src =
              "https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent">
          <h4 className="text-white text-lg font-semibold">{card.title}</h4>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsCard;
