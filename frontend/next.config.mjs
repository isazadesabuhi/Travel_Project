/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // or 'https' if using https
                hostname: 'localhost',
                port: '8000', // replace with your localhost port if different
                pathname: '/media/profile_pics/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
