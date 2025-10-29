<template>
  <v-container class="fill-height" fluid>
    <v-card class="ma-auto" min-width="400px">
      <v-card-title class="text-center">
        ToDo List
      </v-card-title>
      <v-card-text class="text-center text-body-1">
        {{ title }}
      </v-card-text>
      <slot />
      <v-card-actions class="pa-0 justify-end">
        <v-btn
          :to="goToUrl"
          class="text-decoration-underline text-body-2 text-disabled"
          variant="text"
          density="compact"
        >
          {{ goToText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  goToText: string;
  goToUrl: string;
}>();
</script>

<style scoped>

</style>