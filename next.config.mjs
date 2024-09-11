/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
      {
        hostname: "platform-lookaside.fbsbx.com",
        protocol: "https"
      }, 
      {
        hostname: "pbs.twimg.com",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;
