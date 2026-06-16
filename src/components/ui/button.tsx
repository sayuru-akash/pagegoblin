"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-cave text-parchment font-semibold shadow-goblin hover:bg-cave-2 hover:shadow-glow",
  secondary:
    "bg-bone text-ink font-semibold border border-border hover:bg-parchment hover:border-goblin/30",
  ghost:
    "bg-transparent text-ink font-medium hover:bg-bone",
  danger:
    "bg-rose text-white font-semibold hover:bg-rose/90",
} as const;

const sizeStyles = {
  sm: "h-9 px-4 text-sm rounded-lg gap-1.5",
  md: "h-11 px-6 text-sm rounded-xl gap-2",
  lg: "h-14 px-8 text-base rounded-xl gap-2.5",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300 focus-goblin cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
