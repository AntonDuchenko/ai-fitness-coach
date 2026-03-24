import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    metric: "-15kg",
    category: "TRANSFORMATION",
    quote:
      "I tried 5 fitness apps before this. Finally found one that works. My AI coach adjusted everything when I hit a plateau. Lost 15kg in 3 months.",
    author: "Alex Martinez",
    role: "Software Engineer",
  },
  {
    metric: "+5kg",
    category: "MUSCLE GAINED",
    quote:
      "The AI coach understands context. When I mentioned shoulder pain, it adjusted my entire program instantly. Better than my old trainer.",
    author: "Sarah Kim",
    role: "Marketing Lead",
  },
  {
    metric: "+40%",
    category: "STRENGTH BOOST",
    quote:
      "Game changer for busy professionals. I train at odd hours and the AI is always there. No more waiting for trainer replies at 6am.",
    author: "Mike Rodriguez",
    role: "Product Manager",
  },
];

function StarRating() {
  return (
    <span className="text-lg text-amber-500" aria-label="5 out of 5 stars">
      {"★★★★★"}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
      {initial}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="-mx-4 space-y-12 bg-accent px-4 py-16 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-3 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          SUCCESS STORIES
        </p>
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Real People.{"\n"}Real Results.
        </h2>
        <p className="text-muted-foreground">
          Not influencers. Not actors. Just everyday people who showed up.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <Card
            key={item.author}
            className="border-border bg-card shadow-sm"
          >
            <CardContent className="space-y-4 pt-6">
              <p className="font-heading text-4xl font-bold text-success">
                {item.metric}
              </p>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-success/60 uppercase">
                {item.category}
              </p>
              <div className="h-0.5 w-12 rounded-full bg-success" />
              <StarRating />
              <p className="text-sm italic leading-7 text-muted-foreground">
                {item.quote}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Avatar name={item.author} />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
