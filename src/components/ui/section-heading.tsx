import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-block font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-goblin">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl uppercase leading-[0.98] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
