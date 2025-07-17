import type { NextConfig } from "next";

//npm install -D @svgr/webpack para poder importar assets como se fosse componentes
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      }
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/this.webpack",
          options: {
            icon: true
          }
        }
      ]
    })

    return config;
  }
};

export default nextConfig;
