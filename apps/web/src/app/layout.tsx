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
  title: "ForgeFit",
  description: "Forge your best self — AI-powered fitness coaching",
  icons: {
    icon: [
      { url: "/images/logo/logo_64.png", sizes: "64x64", type: "image/png" },
      {
        url: "/images/logo/logo_192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "/images/logo/logo_512.png",
      sizes: "512x512",
      type: "image/png",
    },
  },
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
