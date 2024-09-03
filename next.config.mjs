/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.udiscovermusic.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
