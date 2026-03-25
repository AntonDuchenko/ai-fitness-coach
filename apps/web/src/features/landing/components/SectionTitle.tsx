import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  dark,
}: SectionTitleProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
      <p className="text-xs font-bold tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-heading text-4xl font-extrabold sm:text-5xl",
          dark ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-3xl text-lg",
          dark ? "text-muted-foreground" : "text-slate-500",
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}
