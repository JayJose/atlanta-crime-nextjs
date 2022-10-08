/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiLimit: 5000,
    mapboxAccessToken:
      'pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhzczVoeW4wMGdlM3BuemU0aTh1cXF6In0.P6rxnD9XAxmufeHZRMwGOw'
  }
};

module.exports = nextConfig;
