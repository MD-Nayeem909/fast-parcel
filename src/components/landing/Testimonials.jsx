"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "../motion/FadeIn";
import TestimonialsCard from "../shared/TestimonialsCard";

const cardData = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Senior Full Stack Developer",
    image: "https://i.pravatar.cc/150?u=alex",
    content:
      "This platform has completely transformed how I manage my projects. The UI is incredibly intuitive and the performance is top-notch. Highly recommended for any serious developer.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Digital Marketing Manager",
    image: "https://i.pravatar.cc/150?u=sarah",
    content:
      "The best management tool I've used this year. It's clean, fast, and does exactly what it promises. The dashboard analytics have been a game-changer for our team.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Freelance UI/UX Designer",
    image: "https://i.pravatar.cc/150?u=michael",
    content:
      "I've tried many similar tools, but the user experience here is on another level. It's rare to find a tool that balances power and simplicity so perfectly.",
    rating: 4,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Product Owner",
    image: "https://i.pravatar.cc/150?u=emily",
    content:
      "Everything is so organized! I love how I can customize my categories and items. It has saved me hours of administrative work every single week.",
    rating: 5,
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Tech Entrepreneur",
    image: "https://i.pravatar.cc/150?u=david",
    content:
      "Scalability was my main concern, but this platform handles everything effortlessly. The Pro features are definitely worth the investment for growing businesses.",
    rating: 5,
  },
  {
    id: 6,
    name: "Jessica Lee",
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=jessica",
    content:
      "The visual presentation of the data is beautiful. It makes it so much easier to present my project progress to clients. Truly a professional-grade tool.",
    rating: 5,
  },
  {
    id: 7,
    name: "Robert Taylor",
    role: "Software Architect",
    image: "https://i.pravatar.cc/150?u=robert",
    content:
      "The API integration and the overall architecture are very impressive. It's clear that a lot of thought went into building this system. Very stable.",
    rating: 4,
  },
  {
    id: 8,
    name: "Sophia Martinez",
    role: "Content Strategist",
    image: "https://i.pravatar.cc/150?u=sophia",
    content:
      "Customer support is exceptional. I had a small issue with my account and it was resolved within minutes. Great product with a great team behind it.",
    rating: 5,
  },
  {
    id: 9,
    name: "James Anderson",
    role: "Project Coordinator",
    image: "https://i.pravatar.cc/150?u=james",
    content:
      "Finally, a tool that doesn't feel bloated! It’s streamlined, efficient, and help us keep track of everything without any unnecessary complexity.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(cardData.length / 2)
  );
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const autoplayDelay = 3000;
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  };
  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex]);
  const changeSlide = (newIndex) => {
    const newSafeIndex = (newIndex + cardData.length) % cardData.length;
    setActiveIndex(newSafeIndex);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
  };
  const onDragEnd = (event, info) => {
    const dragThreshold = 75;
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };
  return (
    <section className="w-full flex-col items-center justify-center font-sans overflow-hidden">
      <FadeIn>
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Trusted by Professionals</h2>
          <p className="text-neutral max-w-2xl mx-auto">
            Hear from our community of creators and developers worldwide.
          </p>
        </div>
      </FadeIn>
      <div
        className="w-full max-w-5xl mx-auto p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex w-full flex-col rounded-3xl">
          <div className="relative w-full h-100 md:h-120 flex items-center justify-center overflow-hidden">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {cardData.map((item, index) => (
                <TestimonialsCard
                  key={item.id}
                  item={item}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => changeSlide(activeIndex - 1)}
              className="p-2 rounded-full bg-base-100/50 hover:bg-base-300 border border-primary text-neutral transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {cardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-neutral/20 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-base-100 hover:bg-base-300 border text-neutral border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
