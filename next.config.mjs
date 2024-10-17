/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: {
            displayName: false,
        }
    },
    /* Отключить показ движка */
    poweredByHeader: false,
    optimizeFonts: false,
    images: {
        /* unoptimized: true, */
        remotePatterns: [
            { hostname: "127.0.0.1" }
        ]
    },

    async rewrites() {
        return [
            {
                source: '/media/:path*',
                destination: 'http://localhost:8000/media/:path*',
            },
        ]
    },
};

export default nextConfig;
