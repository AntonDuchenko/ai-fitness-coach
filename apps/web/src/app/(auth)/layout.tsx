import { AuthLayout } from "@/features/auth";

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-foreground">
      <AuthLayout>{children}</AuthLayout>
    </div>
  );
}
