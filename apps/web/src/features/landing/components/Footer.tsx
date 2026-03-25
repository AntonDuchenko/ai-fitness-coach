import { BrandLogo } from "@/components/common/BrandLogo";
import { footerColumns } from "@/features/landing/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-800 px-6 py-16 text-slate-200 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <BrandLogo size={32} />
            <span className="font-heading text-2xl font-bold text-white">
              ForgeFit
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Forge your best self with AI coaching
          </p>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-xs font-bold tracking-wider text-slate-300">
              {col.title}
            </p>
            <ul className="mt-3 space-y-3">
              {col.items.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row">
        <p>&copy; 2026 ForgeFit. All rights reserved.</p>
        <p>Made with ❤️ for your gains</p>
      </div>
    </footer>
  );
}
