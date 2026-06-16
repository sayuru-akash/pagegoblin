"use client";

import { motion, type HTMLMotionProps } from "motion/react";

interface StaggerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
}

export function Stagger({ children, staggerDelay = 0.1, ...props }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
