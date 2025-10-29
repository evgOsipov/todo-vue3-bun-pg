<template>
  <AuthContainer title="Enter in your account" go-to-text="Create account" go-to-url="/signUp">
    <LoginForm />
  </AuthContainer>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue';
import AuthContainer from '../share/AuthContainer.vue';
</script>

<style scoped>

</style>