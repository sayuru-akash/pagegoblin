import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-bone text-ink border border-border",
  goblin: "bg-goblin/15 text-goblin-dark border border-goblin/30",
  warning: "bg-amber/15 text-amber-dark border border-amber/30",
  danger: "bg-rose/15 text-rose border border-rose/30",
  cave: "bg-cave/10 text-cave border border-cave/20",
} as const;

type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, type BadgeProps, type BadgeVariant };
