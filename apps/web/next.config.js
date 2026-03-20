/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@ai-fitness/types",
    "@ai-fitness/utils",
    "@ai-fitness/ui",
  ],
};

module.exports = nextConfig;
