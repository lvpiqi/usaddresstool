import fs from "node:fs/promises";
import path from "node:path";

const distPath = path.resolve("dist");
const assetsIgnorePath = path.join(distPath, ".assetsignore");
const workerIgnoreRule = "_worker.js\n";

async function main() {
  await fs.mkdir(distPath, { recursive: true });
  await fs.writeFile(assetsIgnorePath, workerIgnoreRule, "utf8");
  console.log(`Wrote ${assetsIgnorePath}`);
}

await main();
