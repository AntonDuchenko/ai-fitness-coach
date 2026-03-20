import { formatDate } from "@ai-fitness/utils";

export default function Home() {
  const today = formatDate(new Date());

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-primary">
          AI Fitness Coach
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your personal AI-powered fitness companion
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{today}</p>
      </div>
    </main>
  );
}
