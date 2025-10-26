<template>
  <v-container class="fill-height" fluid>
    <v-card class="ma-auto" min-width="400px">
      <v-card-title class="text-center">
        ToDo List
      </v-card-title>
      <v-card-text class="text-center text-body-1">
        Enter in your account
      </v-card-text>
      <LoginForm />
      <v-card-actions class="pa-0 justify-end">
        <v-btn
          class="text-decoration-underline text-body-2 text-disabled"
          variant="text"
          density="compact"
          to="/signUp"
        >
          Create account
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue';
</script>

<style scoped>

</style>