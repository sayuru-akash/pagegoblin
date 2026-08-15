import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-bone text-muted border border-border",
  goblin: "bg-goblin/10 text-goblin-light border border-goblin/40",
  warning: "bg-amber/15 text-amber-dark border border-amber/30",
  danger: "bg-rose/15 text-rose border border-rose/30",
  cave: "bg-cave text-muted border border-border",
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
        "inline-flex items-center gap-1.5 rounded-[0.25rem] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, type BadgeProps, type BadgeVariant };
