/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SSO_KEY: string
  readonly VITE_SSO_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}