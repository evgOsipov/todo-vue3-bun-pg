<template>
  <v-form ref="form" class="pa-2" @submit.prevent="login">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      variant="solo-filled"
      placeholder="Enter your email"
      label="Enter your email"
    />
    <v-text-field
      v-model="password"
      :rules="passRules"
      variant="solo-filled"
      placeholder="Enter your password"
      label="Enter your password"
      type="password"
    />
    <v-card-actions class="pa-0">
      <v-btn
        :disabled="!isEnabled"
        variant="tonal"
        base-color="success"
        class="text-body-1"
        type="submit"
        block
      >
        Sign In
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import type { VForm } from 'vuetify/components';

import { useAuth } from '../../../stores/auth.ts';

const {
  email,
  password,
  emailRules,
  passRules,
} = storeToRefs(useAuth());
const { login } = useAuth();

const form = ref<VForm | null>(null);
const isEnabled = ref(false);

watch([
  email,
  password,
], async () => {
  if (!form.value) {
    return;
  }
  const isValidate = await form.value.validate()
  isEnabled.value = isValidate.valid;
});
</script>

<style scoped>

</style>