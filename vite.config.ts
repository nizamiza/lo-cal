import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "lo-cal",
        short_name: "lo-cal",
        theme_color: "hotpink",
        description:
          "A simple calendar that stores all of your events locally.",
        icons: [
          {
            src: "/lo-cal.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/lo-cal-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
