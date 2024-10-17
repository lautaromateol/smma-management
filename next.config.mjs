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
        hostname: "*.fbcdn.net",
        protocol: "https",
      },
      {
        hostname: "upload.wikimedia.org",
        protocol: "https"
      },
      {
        hostname: "scontent.cdninstagram.com",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;

