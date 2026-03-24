/**
 * API Configuration
 * -----------------
 * Uses environment variable VITE_API_URL in production, 
 * defaults to localhost:8000 for local development.
 */

// If VITE_API_URL is not set, we default to localhost:8000
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const API_BASE_URL = rawUrl.replace(/\/+$/, '')

console.log('🔗 API Base URL:', API_BASE_URL)
