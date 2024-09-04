/** @type {import('next').NextConfig} */

export default {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5001/api/:path*', // Замените на адрес вашего сервера
            },
        ];
    },
    images: {
        domains: ['t.me'],
    },
};