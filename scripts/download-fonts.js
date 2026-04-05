#!/usr/bin/env node

/**
 * Downloads proprietary fonts from Vercel Blob Storage during build time.
 * This keeps font files out of the public repository while using them in production.
 */

const https = require("node:https");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const fontsDir = path.join(import.meta.dirname, "..", "fonts");

// Ensure fonts directory exists
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fonts = [
  {
    url: process.env.FONT_DOWNLOAD_URL_GT_CINETYPE,
    filename: "GT-Cinetype-Regular.woff",
    name: "GT Cinetype Regular",
  },
  {
    url: process.env.FONT_DOWNLOAD_URL_ANDALE_MONO,
    filename: "ANDALEMO.woff",
    name: "Andale Mono",
  },
];

function downloadFont(url, filepath, name) {
  return new Promise((resolve, reject) => {
    // Skip if no URL provided
    if (!url) {
      console.log(
        `⚠️  No download URL for ${name}, checking if file exists locally...`
      );

      if (fs.existsSync(filepath)) {
        console.log(`✓ ${name} found locally`);
        return resolve();
      }

      console.log(`⚠️  ${name} not found, build will use fallback fonts`);
      return resolve();
    }

    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${name} already exists locally, skipping download`);
      return resolve();
    }

    console.log(`⬇️  Downloading ${name} from Vercel Blob...`);

    const client = url.startsWith("https") ? https : http;

    client
      .get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 302 || response.statusCode === 301) {
          return downloadFont(response.headers.location, filepath, name)
            .then(resolve)
            .catch(reject);
        }

        if (response.statusCode !== 200) {
          console.log(
            `⚠️  Failed to download ${name} (${response.statusCode}), continuing with local version if available`
          );
          return resolve();
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`✓ ${name} downloaded successfully`);
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(filepath);
          console.log(`⚠️  Error downloading ${name}:`, err.message);
          resolve(); // Don't fail the build
        });
      })
      .on("error", (err) => {
        console.log(`⚠️  Network error downloading ${name}:`, err.message);
        resolve(); // Don't fail the build
      });
  });
}

async function downloadAllFonts() {
  console.log("\n🔤 Checking fonts...\n");

  try {
    await Promise.all(
      fonts.map((font) =>
        downloadFont(font.url, path.join(fontsDir, font.filename), font.name)
      )
    );

    console.log("\n✅ Font setup complete!\n");
  } catch (error) {
    console.error("\n⚠️  Font download encountered issues:", error.message);
    console.log("Build will continue with available fonts\n");
  }
}

downloadAllFonts();
