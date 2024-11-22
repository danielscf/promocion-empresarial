/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/emprendedor/**', 
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/imagen/**', 
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/marca/**', 
            },
        ],
    },
};

module.exports = nextConfig;

