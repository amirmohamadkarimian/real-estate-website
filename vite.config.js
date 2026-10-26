import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox-only overrides, applied only when BASE44_PREVIEW_MODE === '1'.
// Unset / any other value => the original Vite defaults are untouched.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'

const previewHosts = [
  process.env.BASE44_SANDBOX_HOST_DOMAIN && `.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`,
  process.env.BASE44_PUBLIC_HOST_SUFFIX && `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`,
].filter(Boolean)

const server = {
  host: '0.0.0.0',
  port: 3000,
  strictPort: true,
}

if (previewMode && previewHosts.length) {
  // The preview proxy reaches the dev server through the sandbox hostname, and
  // the browser's Origin/Host is the public preview host.
  server.allowedHosts = previewHosts
  // Bind mounts don't emit inotify events reliably inside the sandbox.
  server.watch = { usePolling: true }
}

export default defineConfig({
  plugins: [react()],
  server,
})
