/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '129.148.27.57',
                port: '8080',
                pathname: '/promocion-empresarial/emprendedor/**',
            },            
            {
                protocol: 'http',
                hostname: '129.148.27.57',
                port: '8080',
                pathname: '/promocion-empresarial/imagen/**', 
            },
            {
                protocol: 'http',
                hostname: '129.148.27.57',
                port: '8080',
                pathname: '/promocion-empresarial/marca/**', 
            },
        ],
    },
};

module.exports = nextConfig;

