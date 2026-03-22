export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-foreground">
      {children}
    </div>
  );
}
