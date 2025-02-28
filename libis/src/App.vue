<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <button v-if="!isLoggedIn" @click="login">Login</button>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <p v-if="user">{{ user.username }}</p>
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
import { ref } from "vue";
import router from "./router";

const isLoggedIn = ref(false);
const user = ref(null);

const login = () => {
  isLoggedIn.value = true;
  user.value = { username: "vite_user" };
};

const logout = () => {
  isLoggedIn.value = false;
  user.value = null;
};
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
