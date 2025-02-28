<template>
  <component :is="PageHeader" />
  <div>
    <nav>
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </nav>
    <button
      v-if="!authStore.isAuthenticated"
      @click="authStore.login"
    >
      Login
    </button>
    <button
      v-if="authStore.isAuthenticated"
      @click="authStore.logout"
    >
      Logout
    </button>
    <p v-if="authStore.user">
      {{ authStore.user.first_name }} {{ authStore.user.last_name }} ({{
        authStore.user.username
      }})
    </p>
    <router-view />
  </div>


  <component :is="PageFooter" />
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/authStore";

import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";

const authStore = useAuthStore();
const route = useRoute();

// Watch for route changes to update authentication state
watch(
  () => route.fullPath,
  () => {
    authStore.fetchUser();
  }
);

onMounted(() => {
  authStore.fetchUser();
});
</script>

<style scoped>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

</style>
