"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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

  const toggleItem = (category: string, item: string, next: boolean) => {
    const key = `${category}::${item}`;
    setChecked((prev) => ({ ...prev, [key]: next }));
  };

  const exportToEmail = async () => {
    const selected: Record<string, string[]> = {};
    for (const [category, items] of categories) {
      const picked = items.filter((it) => checked[`${category}::${it}`]);
      if (picked.length) selected[category] = picked;
    }

    const text =
      Object.keys(selected).length > 0
        ? Object.entries(selected)
            .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
            .join("\n")
        : categories
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
    <section className="rounded-2xl border border-border/60 bg-card/60 p-4 lg:p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-base font-semibold">
            Your Grocery List
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Check items and export when ready.
          </p>
        </div>
        <Badge variant="outline" className="rounded-full">
          {categories.reduce((sum, [, items]) => sum + items.length, 0)} items
        </Badge>
      </header>

      <div className="mt-4 grid gap-4">
        {categories.map(([category, items]) => (
          <div
            key={category}
            className="rounded-xl border border-border/60 bg-card/30 p-3"
          >
            <p className="font-heading text-sm font-semibold">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {items.map((item) => {
                const key = `${category}::${item}`;
                const isChecked = Boolean(checked[key]);
                return (
                  <div
                    key={key}
                    aria-label={`Grocery item: ${item}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border border-transparent px-2 py-1 transition-colors hover:border-border",
                      isChecked && "border-border",
                    )}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(v) =>
                        toggleItem(category, item, v === true)
                      }
                      aria-label={`Grocery item: ${item}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-5 flex flex-col gap-3 rounded-xl border border-border/60 bg-card/30 p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {Object.values(checked).filter(Boolean).length} of{" "}
          {categories.reduce((sum, [, items]) => sum + items.length, 0)} items
          checked
        </p>
        <Button type="button" variant="outline" onClick={exportToEmail}>
          Export to Email
        </Button>
      </footer>
    </section>
  );
}
