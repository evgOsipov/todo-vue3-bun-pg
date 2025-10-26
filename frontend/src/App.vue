<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class="text-center">
        {{ appTitle }}
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useCommon } from './stores/common.ts';

const { appTitle } = storeToRefs(useCommon());
const { initApp } = useCommon();

initApp();
</script>

<style scoped>

</style>