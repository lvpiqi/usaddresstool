import fs from "node:fs/promises";
import path from "node:path";

const distPath = path.resolve("dist");
const assetsIgnorePath = path.join(distPath, ".assetsignore");
const sitemapIndexPath = path.join(distPath, "sitemap-index.xml");
const sitemapAliasPath = path.join(distPath, "sitemap.xml");
const workerIgnoreRule = "_worker.js\n";

async function main() {
  await fs.mkdir(distPath, { recursive: true });
  await fs.writeFile(assetsIgnorePath, workerIgnoreRule, "utf8");
  console.log(`Wrote ${assetsIgnorePath}`);

  try {
    const sitemapIndexXml = await fs.readFile(sitemapIndexPath, "utf8");
    await fs.writeFile(sitemapAliasPath, sitemapIndexXml, "utf8");
    console.log(`Wrote ${sitemapAliasPath}`);
  } catch (error) {
    console.warn(
      `Skipped sitemap alias generation: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

await main();
