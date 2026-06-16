"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps extends HTMLMotionProps<"span"> {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  staggerDelay = 0.04,
  ...props
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cn("mr-[0.25em] inline-block", wordClassName)}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
