<template>
  <AuthContainer title="Fill the registration form" go-to-text="I have an account" go-to-url="/signIn">
    <RegisterForm />
  </AuthContainer>
</template>

<script lang="ts" setup>
import RegisterForm from './RegisterForm.vue';
import AuthContainer from '../share/AuthContainer.vue';
</script>

<style scoped>

</style>