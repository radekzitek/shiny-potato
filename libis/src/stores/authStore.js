import { defineStore } from "pinia";
import auth from "../services/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async fetchUser() {
      if (auth.isAuthenticated()) {
        this.isAuthenticated = true;
        this.user = await auth.getProfile();
      } else {
        this.isAuthenticated = false;
        this.user = null;
      }
    },

    login() {
      auth.login();
    },

    logout() {
      auth.logout();
      this.isAuthenticated = false;
      this.user = null;
    },
  },

  getters: {
    userName: (state) =>
      state.user ? `${state.user.first_name} ${state.user.last_name}` : "Guest",
  },
});
