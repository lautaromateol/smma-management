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
      },
      {
        hostname: "z-p3-scontent.fcnq2-1.fna.fbcdn.net",
        protocol: "https"
      },
      {
        hostname: "z-p3-scontent.fcnq2-2.fna.fbcdn.net",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;
