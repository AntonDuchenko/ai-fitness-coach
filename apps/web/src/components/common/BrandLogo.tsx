import { cn } from "@/lib/utils";
import Image from "next/image";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 32, className }: BrandLogoProps) {
  return (
    <Image
      src="/images/logo/logo_192.png"
      alt="ForgeFit"
      width={size}
      height={size}
      unoptimized
      className={cn("shrink-0", className)}
    />
  );
}
