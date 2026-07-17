/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/register',
      destination: '/programs',
      permanent: true,
    },
  ],
}

module.exports = nextConfig
