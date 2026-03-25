/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@ai-fitness/types",
    "@ai-fitness/utils",
    "@ai-fitness/ui",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
  },
};

module.exports = nextConfig;
