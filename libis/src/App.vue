<template>
  <div class="app-container">
    <component :is="PageHeader" />
    <main class="content-container">
      <router-view />
    </main>
    <component :is="PageFooter" />
  </div>
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
  },
);

onMounted(() => {
  authStore.fetchUser();
});
</script>

<style scoped>
/* Add this styling */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  flex: 1;
  width: 100%;
  padding: 20px;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
