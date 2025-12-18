# Fonts Directory

⚠️ **Font files (.woff) are NOT included in this repository due to licensing restrictions.**

## How It Works

Fonts are automatically downloaded during production builds from Vercel Blob Storage.

## Required Files

- `GT-Cinetype-Regular.woff` - Downloaded from `FONT_DOWNLOAD_URL_GT_CINETYPE`
- `ANDALEMO.woff` - Downloaded from `FONT_DOWNLOAD_URL_ANDALE_MONO`

## For Local Development

If you have the font files locally, place them in this directory. The app will use them.

If you don't have them, the app will work fine - Next.js will use system fallback fonts during development.

## For Production (Vercel)

Make sure these environment variables are set in Vercel:

```bash
FONT_DOWNLOAD_URL_GT_CINETYPE=https://your-blob-url.vercel-storage.com/GT-Cinetype-Regular-xxx.woff
FONT_DOWNLOAD_URL_ANDALE_MONO=https://your-blob-url.vercel-storage.com/ANDALEMO-xxx.woff
```

The `prebuild` script will automatically download fonts before the build starts.

## License Compliance

These fonts are proprietary and licensed. Per the license terms:
- ✅ Can use on websites via `@font-face`
- ❌ Cannot distribute in public repositories
- ❌ Cannot share font files publicly

That's why font files are in `.gitignore` and downloaded from secure storage during builds.

