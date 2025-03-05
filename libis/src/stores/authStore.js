import { defineStore } from "pinia";
import router from "../router";
import AuthService from "../services/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    user: null,
    isAuthenticated: false,
    codeVerifier: null,
  }),

  actions: {
    async login() {
      const { authUrl, codeVerifier } = await AuthService.getLoginUrl();
      this.codeVerifier = codeVerifier;
      localStorage.setItem("code_verifier", codeVerifier);
      window.location.href = authUrl;
    },

    async handleCallback(code) {
      const codeVerifier = localStorage.getItem("code_verifier");
      const tokenData = await AuthService.fetchTokens(code, codeVerifier);

      if (tokenData) {
        this.setTokens(tokenData);
        router.replace("/");
      }
    },

    setTokens(tokenData) {
      this.accessToken = tokenData.access_token;
      this.refreshToken = tokenData.refresh_token;
      this.expiresAt = new Date().getTime() + tokenData.expires_in * 1000;
      this.isAuthenticated = true;

      // Store in localStorage
      localStorage.setItem("access_token", this.accessToken);
      localStorage.setItem("refresh_token", this.refreshToken);
      localStorage.setItem("expires_at", this.expiresAt);
    },

    loadTokens() {
      this.accessToken = localStorage.getItem("access_token");
      this.refreshToken = localStorage.getItem("refresh_token");
      this.expiresAt = localStorage.getItem("expires_at");

      // Check if token is valid
      this.isAuthenticated = AuthService.isTokenValid(this.expiresAt);
    },

    async logout() {
      // Logout from the OAuth2 server
      // await AuthService.logout();
      
      // Revoke tokens on the server before clearing locally
      await AuthService.revokeToken(this.accessToken, "access_token");
      await AuthService.revokeToken(this.refreshToken, "refresh_token");

      // Clear all auth data
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("code_verifier");

      this.accessToken = null;
      this.refreshToken = null;
      this.expiresAt = null;
      this.user = null;
      this.isAuthenticated = false;

      router.push("/");
    },

    async fetchUser() {
      if (this.isAuthenticated) {
        try {
          this.user = await AuthService.getProfile(this.accessToken);
        } catch (error) {
          // If token expired, try to refresh
          await this.refreshTokens();
        }
      } else {
        this.loadTokens(); // Try loading from localStorage
        if (this.isAuthenticated) {
          this.user = await AuthService.getProfile(this.accessToken);
        }
      }
    },

    async refreshTokens() {
      if (this.refreshToken) {
        const tokenData = await AuthService.refreshAccessToken(this.refreshToken);
        if (tokenData) {
          this.setTokens(tokenData);
          return true;
        }
      }

      // If refresh fails, logout
      this.logout();
      return false;
    },
  },

  getters: {
    userName: (state) =>
      state.user ? `${state.user.first_name} ${state.user.last_name}` : "Guest",
  },
});
