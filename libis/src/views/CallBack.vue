<template>
  <div>
    <p>Please wait while we complete your login.</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    await authStore.handleCallback(code);
  } else {
    console.error("No authorization code found in URL");
    // Redirect to home or error page
  }
});
</script>
