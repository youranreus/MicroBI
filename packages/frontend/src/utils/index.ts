import type { RouteRecordRaw } from 'vue-router'

export const ENV = {
  API: import.meta.env.VITE_API_URL,
  SSO_URL: import.meta.env.VITE_SSO_URL,
  SSO_KEY: import.meta.env.VITE_SSO_KEY
}

// 只获取一层
export const getBasicRoute = (raw: RouteRecordRaw[]) => {
  return raw.map((r) => ({
    name: r.name,
    path: r.path,
    meta: r.meta
  }))
}
