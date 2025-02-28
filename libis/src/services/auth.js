// src/services/auth.js
import router from '../router'

const AUTH_CONFIG = {
  domain: 'http://localhost:8000',  // Django server URL
  clientId: '9GWMH1jL9l0Bgynuo5CQW5AGfe6BOJMcMdsJh66X', // Get this by registering your app in Django admin
  redirectUri: 'http://localhost:5173/callback', // Vite default port with callback route
  responseType: 'code',
  scope: 'read write',
  audience: 'api',
  codeChallenge: '1bevztKqvNATbTd9RWOHtAHdB0P2gf1HCC0HmklqYGk',
  codeVerifier: 'R3RBTCB9AK4UQY2W7KYJSOMEY80HVP2ND2S6NPKPQVR3EBOTH6WSO9DNA91HG'
}

class AuthService {
  constructor() {
    this.accessToken = null
    this.refreshToken = null
    this.expiresAt = null
    this.loadTokens()
  }

  // Generate code verifier for PKCE
  generateCodeVerifier() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    let result = ''
    const randomValues = new Uint8Array(128)
    window.crypto.getRandomValues(randomValues)
    for (let i = 0; i < 128; i++) {
      result += chars[randomValues[i] % chars.length]
    }
    return result
  }

  // Generate code challenge from verifier
  async generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  // Login - redirect to auth server
  async login() {
    const codeVerifier = this.generateCodeVerifier()
    const codeChallenge = await this.generateCodeChallenge(codeVerifier)
    
    // Store code verifier for later use
    localStorage.setItem('code_verifier', codeVerifier)
    
    const authUrl = new URL(`${AUTH_CONFIG.domain}/o/authorize/`)
    const params = {
      response_type: AUTH_CONFIG.responseType,
      client_id: AUTH_CONFIG.clientId,
      redirect_uri: AUTH_CONFIG.redirectUri,
      scope: AUTH_CONFIG.scope,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    }
    
    authUrl.search = new URLSearchParams(params).toString()
    window.location.href = authUrl.toString()
  }

  // Handle callback from auth server
  async handleCallback(code) {
    const codeVerifier = localStorage.getItem('code_verifier')
    if (!codeVerifier) {
      console.error('No code verifier found')
      return
    }
    
    try {
      const response = await fetch(`${AUTH_CONFIG.domain}/o/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: AUTH_CONFIG.redirectUri,
          client_id: AUTH_CONFIG.clientId,
          code_verifier: codeVerifier
        })
      })
      
      const data = await response.json()
      this.setSession(data)
      router.replace('/')
    } catch (error) {
      console.error('Error exchanging code for tokens:', error)
    }
  }

  // Set session data
  setSession(authResult) {
    this.accessToken = authResult.access_token
    this.refreshToken = authResult.refresh_token
    this.expiresAt = new Date().getTime() + authResult.expires_in * 1000
    
    localStorage.setItem('access_token', this.accessToken)
    localStorage.setItem('refresh_token', this.refreshToken)
    localStorage.setItem('expires_at', this.expiresAt)
  }

  // Load tokens from local storage
  loadTokens() {
    this.accessToken = localStorage.getItem('access_token')
    this.refreshToken = localStorage.getItem('refresh_token')
    this.expiresAt = localStorage.getItem('expires_at')
  }

  // Logout
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('code_verifier')
    
    this.accessToken = null
    this.refreshToken = null
    this.expiresAt = null
    
    // Optionally revoke token on the server if your provider supports it
    // this.revokeToken()
    
    router.push('/')
  }

  // Check if authenticated
  isAuthenticated() {
    return this.accessToken && new Date().getTime() < this.expiresAt
  }

  // Get user profile
  async getProfile() {
    if (!this.isAuthenticated()) {
      return null
    }

    try {
      const response = await fetch(`${AUTH_CONFIG.domain}/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }
}

export default new AuthService()