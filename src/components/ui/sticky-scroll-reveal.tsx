"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    tag?: string;
    description?: React.ReactNode;
    content?: React.ReactNode;
    icon?: React.ReactNode;
    image: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) =>
      cardLength === 1 ? 0 : index / (cardLength - 1)
    );

    let closestBreakpointIndex = 0;
    let minDistance = Math.abs(latest - cardsBreakpoints[0]);

    for (let i = 1; i < cardsBreakpoints.length; i++) {
      const distance = Math.abs(latest - cardsBreakpoints[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestBreakpointIndex = i;
      }
    }

    if (latest >= 0.95) {
      closestBreakpointIndex = cardLength - 1;
    }

    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#ffffff", // white background
    "#f9fafb", // light gray
    "#f1f5f9", // slightly darker light
  ];
  const linearGradients = React.useMemo(
    () => [
      "linear-gradient(to bottom right, #06b6d4, #e0f2fe)", // cyan to light blue
      "linear-gradient(to bottom right, #a5b4fc, #fdf4ff)", // indigo to pink-100
      "linear-gradient(to bottom right, #fde68a, #fff7ed)", // yellow to warm light
    ],
    []
  );

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-screen justify-center space-x-10 overflow-y-auto rounded-none pt-28 m-0 p-10"
      ref={ref}>
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} id={item.tag} className="my-40">
              <motion.h2
                className="lg:font-normal tracking-tighter text-2xl lg:text-3xl text-gray-900 flex items-center gap-2"
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}>
                {item.icon} {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mt-10 max-w-sm text-sky-600">
                {item.content}
              </motion.p>
            </div>
          ))}
          <div className="h-96" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-96 w-[32rem] overflow-hidden rounded-md bg-white lg:block",
          contentClassName
        )}>
        <Image
          src={content[activeCard].image ?? null}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          alt={content[activeCard].title}
        />
      </div>
    </motion.div>
  );
};
