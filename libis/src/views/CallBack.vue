<template>
    <div>
        <h1>Processing authentication...</h1>
        <p>Please wait while we complete your login.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import auth from '../services/auth';

onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        auth.handleCallback(code);
    } else {
        console.error('No authorization code found in URL');
        // Redirect to home or error page
    }
});
</script>