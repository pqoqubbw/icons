# Fonts Directory

⚠️ **Proprietary font files (.woff) are NOT included in this repository due to licensing restrictions.**

## How It Works

- **Development**: Uses Google Fonts (Geist) automatically — no setup needed
- **Production**: Downloads proprietary fonts from Vercel Blob Storage during build

Contributors can run `pnpm install && pnpm dev` without any additional configuration.

## Required Files (Production Only)

- `GT-Cinetype-Regular.woff` - Downloaded from `FONT_DOWNLOAD_URL_GT_CINETYPE`
- `ANDALEMO.woff` - Downloaded from `FONT_DOWNLOAD_URL_ANDALE_MONO`

## For Production (Vercel)

Set these environment variables in Vercel:

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
