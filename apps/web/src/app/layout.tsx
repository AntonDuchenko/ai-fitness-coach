import { AuthProviderWrapper } from "@/features/auth";
import { Providers } from "@/lib/providers";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "AI Fitness Coach",
  description: "Your personal AI-powered fitness companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark ${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Providers>
          <AuthProviderWrapper>{children}</AuthProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}
