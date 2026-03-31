"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Clipboard, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const CATEGORY_ICONS: Record<string, string> = {
  proteins: "text-m3-primary-container",
  carbs: "text-m3-secondary",
  fats: "text-[var(--m3-tertiary)]",
  vegetables: "text-m3-secondary",
  dairy: "text-m3-primary-container",
};

export function GroceryListPanel({
  groceryList,
}: {
  groceryList: Record<string, string[]>;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => {
    const order = ["proteins", "carbs", "fats", "vegetables", "dairy"];
    const entries = Object.entries(groceryList ?? {});
    entries.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
    return entries;
  }, [groceryList]);

  const totalItems = categories.reduce(
    (sum, [, items]) => sum + items.length,
    0,
  );
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggleItem = (category: string, item: string) => {
    const key = `${category}::${item}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyList = async () => {
    const text = categories
      .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Grocery list copied to clipboard");
    } catch {
      toast.info("Copy not available in this browser");
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-heading text-xl font-bold text-m3-on-surface">
          Weekly Shopping
        </h4>
        <button
          type="button"
          onClick={copyList}
          className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-m3-primary-container hover:underline"
        >
          <Clipboard className="size-4" aria-hidden />
          Copy List
        </button>
      </div>

      {categories.map(([category, items]) => {
        const remaining = items.filter(
          (it) => !checked[`${category}::${it}`],
        ).length;
        return (
          <details
            key={category}
            className="group rounded-2xl border border-m3-outline-variant/5 bg-m3-surface-low"
            open
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 hover:bg-m3-surface-high">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl bg-m3-surface-highest/30",
                    CATEGORY_ICONS[category] ?? "text-m3-outline",
                  )}
                >
                  <ShoppingCart className="size-5" aria-hidden />
                </div>
                <div>
                  <h5 className="font-semibold text-m3-on-surface">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h5>
                  <p className="text-[10px] text-m3-outline">
                    {remaining} item{remaining !== 1 ? "s" : ""} remaining
                  </p>
                </div>
              </div>
              <ChevronDown
                className="size-5 text-m3-outline transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="space-y-3 px-5 pb-5">
              {items.map((item) => {
                const key = `${category}::${item}`;
                const isChecked = Boolean(checked[key]);
                return (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-m3-outline-variant/10 bg-m3-surface-lowest p-4 transition-colors hover:border-m3-primary-container/30"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(category, item)}
                        className="size-5 rounded border-m3-outline-variant bg-transparent text-m3-primary-container accent-m3-primary-container"
                      />
                      <span
                        className={cn(
                          "text-sm font-medium text-m3-on-surface",
                          isChecked && "line-through opacity-50",
                        )}
                      >
                        {item}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </details>
        );
      })}

      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-m3-primary-container/10 bg-m3-surface-highest p-6 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-m3-secondary/20 text-m3-secondary">
            <ShoppingCart className="size-6" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-m3-outline">
              Items Checked
            </p>
            <h4 className="font-heading text-2xl font-extrabold text-m3-on-surface">
              {checkedCount} / {totalItems}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
