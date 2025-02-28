<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <button v-if="!isAuthenticated" @click="login">Login</button>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
    <p v-if="user">{{ user.first_name }} {{ user.last_name }} ({{ user.username }})</p>
    <router-view />
  </div>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import auth from "./services/auth";

const isAuthenticated = ref(false);
const user = ref(null);
const route = useRoute();

const login = () => {
  auth.login();
};

const logout = () => {
  auth.logout();
  isAuthenticated.value = false;
  user.value = null;
};

const fetchUserInfo = async () => {
  if (auth.isAuthenticated()) {
    isAuthenticated.value = true;
    user.value = await auth.getProfile();
  }
};

// Watch for route changes to update authentication state
watch(
  () => route.fullPath,
  () => {
    fetchUserInfo();
  }
);

onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
