import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@ai-fitness/utils";
import Link from "next/link";

export default function Home() {
  const today = formatDate(new Date());

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-4xl font-bold text-primary">
            AI Fitness Coach
          </CardTitle>
          <CardDescription className="text-lg">
            Your personal AI-powered fitness companion
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">{today}</p>
          <Button asChild>
            <Link href="/onboarding">Get Started</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
