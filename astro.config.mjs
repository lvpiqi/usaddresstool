import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

const defaultSiteUrl = "https://usaddresstool.com";
const siteUrl = process.env.SITE_URL?.trim() || defaultSiteUrl;

export default defineConfig({
  site: siteUrl,
  trailingSlash: "always",
  output: "static",
  session: {
    driver: "memory"
  },
  adapter: cloudflare({
    imageService: "compile"
  }),
  integrations: [sitemap()]
});
