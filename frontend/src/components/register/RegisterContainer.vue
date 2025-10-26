<template>
<v-container class="fill-height" fluid>
  <v-card class="ma-auto" min-width="400px">
    <v-card-title class="text-center">
      ToDo List
    </v-card-title>
    <v-card-text class="text-center text-body-1">
      Fill the registration form
    </v-card-text>
    <RegisterForm />
    <v-card-actions class="pa-0 justify-end">
      <v-btn
        class="text-decoration-underline text-body-2 text-disabled"
        variant="text"
        density="compact"
        to="/signIn"
      >
        I have an account
      </v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script lang="ts" setup>
import RegisterForm from './RegisterForm.vue';
</script>

<style scoped>

</style>