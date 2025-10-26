import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  name: string;
  email: string;
}

export const useUser = defineStore('user', () => {
  const currentUser = ref<User>();

  return {
    currentUser,
  }
});
