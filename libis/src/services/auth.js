import SentryService from "../services/sentry";

const AUTH_CONFIG = {
  domain: "http://localhost:8000",
  clientId: "9GWMH1jL9l0Bgynuo5CQW5AGfe6BOJMcMdsJh66X",
  redirectUri: "http://localhost:5173/callback",
  responseType: "code",
  scope: "read write",
  audience: "api",
};

class AuthService {
  // Generate code verifier for PKCE
  generateCodeVerifier() {
    console.log("Generating code verifier...");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";
    const randomValues = new Uint8Array(128);
    window.crypto.getRandomValues(randomValues);
    for (let i = 0; i < 128; i++) {
      result += chars[randomValues[i] % chars.length];
    }
    console.log("Code verifier generated:", result);
    return result;
  }

  // Generate code challenge from verifier
  async generateCodeChallenge(codeVerifier) {
    console.log("Generating code challenge from verifier...");
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    console.log("Code challenge generated:", codeChallenge);
    return codeChallenge;
  }

  // Login - return auth URL and code verifier
  async getLoginUrl() {
    console.log("Generating login URL...");
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const authUrl = new URL(`${AUTH_CONFIG.domain}/o/authorize/`);
    const params = {
      response_type: AUTH_CONFIG.responseType,
      client_id: AUTH_CONFIG.clientId,
      redirect_uri: AUTH_CONFIG.redirectUri,
      scope: AUTH_CONFIG.scope,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    };

    authUrl.search = new URLSearchParams(params).toString();

    console.log("Login URL generated:", authUrl.toString());
    return {
      authUrl: authUrl.toString(),
      codeVerifier,
    };
  }

  // Handle callback from auth server - returns token data
  async fetchTokens(code, codeVerifier) {
    console.log("Fetching tokens with code and code verifier...");
    if (!codeVerifier) {
      SentryService.error("No code verifier provided");
      console.error("No code verifier provided");
      return null;
    }

    try {
      const response = await fetch(`${AUTH_CONFIG.domain}/o/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: AUTH_CONFIG.redirectUri,
          client_id: AUTH_CONFIG.clientId,
          code_verifier: codeVerifier,
        }),
      });

      const tokenData = await response.json();
      console.log("Tokens fetched:", tokenData);
      return tokenData;
    } catch (error) {
      SentryService.error("Error exchanging code for tokens:", error);
      console.error("Error exchanging code for tokens:", error);
      return null;
    }
  }

  // Revoke token on the server
  async revokeToken(token, tokenTypeHint = "access_token") {
    console.log(`Revoking ${tokenTypeHint}...`);
    if (!token) {
      console.warn(`No ${tokenTypeHint} provided`);
      return;
    }

    try {
      await fetch(`${AUTH_CONFIG.domain}/o/revoke_token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: token,
          client_id: AUTH_CONFIG.clientId,
          token_type_hint: tokenTypeHint,
        }),
      });
      console.log(`${tokenTypeHint} revoked successfully`);
    } catch (error) {
      SentryService.error(`Error revoking ${tokenTypeHint}:`, error);
      console.error(`Error revoking ${tokenTypeHint}:`, error);
    }
  }

  // Logout from the OAuth2 server
  async logout() {
    console.log("Logging out from OAuth2 server...");
    try {
      await fetch(`${AUTH_CONFIG.domain}/o/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: AUTH_CONFIG.clientId,
        }),
      });
      console.log("Logged out from OAuth2 server successfully");
    } catch (error) {
      SentryService.error("Error logging out from OAuth2 server:", error);
      console.error("Error logging out from OAuth2 server:", error);
    }
  }

  // Get user profile
  async getProfile(accessToken) {
    console.log("Fetching user profile...");
    if (!accessToken) {
      console.warn("No access token provided");
      return null;
    }

    try {
      const response = await fetch(`${AUTH_CONFIG.domain}/users/me/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const profile = await response.json();
      console.log("User profile fetched:", profile);
      return profile;
    } catch (error) {
      SentryService.error("Error fetching user profile:", error);
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  // Refresh token
  async refreshAccessToken(refreshToken) {
    console.log("Refreshing access token...");
    if (!refreshToken) {
      console.warn("No refresh token provided");
      return null;
    }

    try {
      const response = await fetch(`${AUTH_CONFIG.domain}/o/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: AUTH_CONFIG.clientId,
        }),
      });

      const tokenData = await response.json();
      console.log("Access token refreshed:", tokenData);
      return tokenData;
    } catch (error) {
      SentryService.error("Error refreshing token:", error);
      console.error("Error refreshing token:", error);
      return null;
    }
  }

  // Check if token is valid
  isTokenValid(expiresAt) {
    const isValid = expiresAt && new Date().getTime() < expiresAt;
    console.log("Token validity checked:", isValid);
    return isValid;
  }
}

export default new AuthService();