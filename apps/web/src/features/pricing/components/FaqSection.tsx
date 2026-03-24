"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "../constants";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-6">
      <h2 className="text-center font-heading text-3xl font-bold text-foreground">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Collapsible
              key={item.question}
              open={isOpen}
              onOpenChange={(open) => setOpenIndex(open ? index : null)}
              className="rounded-xl border border-border bg-card px-4"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left">
                <span className="font-medium text-foreground">{item.question}</span>
                <ChevronDown
                  className={cn("size-4 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                  aria-hidden
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-4 text-sm text-muted-foreground">
                {item.answer}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </section>
  );
}
