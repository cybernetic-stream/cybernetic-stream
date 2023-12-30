/** @type {import('next').NextConfig} */
export const nextConfig = {
  async headers() {
    return [
//      {
//        source: '/public',
//        headers: [
//          {
//            key: 'Cache-Control',
//            value: 'public, max-age=86400',
//          },
//        ],
//      },
    ];
  },
};

