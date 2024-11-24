import type { NextConfig } from 'next';

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset', // Utilise le type `asset`
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false, // Désactive l'optimisation SVGO pour simplifier le test
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};
export default nextConfig;
