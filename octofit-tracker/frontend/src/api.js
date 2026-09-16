const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const forwardedCodespaceName = typeof window !== 'undefined'
  ? window.location.hostname.match(/^(.*)-5173\.app\.github\.dev$/)?.[1]
  : undefined
const codespaceName = configuredCodespaceName || forwardedCodespaceName

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  return normalizeCollection(await response.json())
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  return []
}