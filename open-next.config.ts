import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// The /ar and /en pages are built once at build time and never revalidated, so they are served straight
// from Workers static assets (no KV / R2 needed). Without this, those pages answer 404 on Cloudflare.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
