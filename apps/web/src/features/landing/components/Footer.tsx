import { footerColumns } from "@/features/landing/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="rounded-t-[2rem] bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-6 py-12 md:grid-cols-4 md:gap-12 md:px-8 md:py-16">
        <div>
          <p className="mb-6 text-xl font-bold text-white">ForgeFit</p>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Built for the modern athlete who demands precision, science, and
            results.
          </p>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="mb-6 font-bold text-white">{col.title}</p>
            <ul className="space-y-4">
              {col.items.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto max-w-7xl border-t border-border/10 px-6 py-8 text-center md:px-8 md:text-left">
        <p className="text-sm text-muted-foreground">
          &copy; 2026 ForgeFit. Built for the modern athlete.
        </p>
      </div>
    </footer>
  );
}
