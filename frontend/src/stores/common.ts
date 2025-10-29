import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Api } from '../api/api.ts';
import { authApi } from '../api/auth.ts';

export const useCommon = defineStore('common', () => {
  const router = useRouter();

  const appTitle = ref('ToDo list');

  router.beforeEach((to) => {
    appTitle.value = to.name as string;
  });

  const axiosInterceptor = async (error: AxiosError): Promise<void> => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const response = await authApi.refresh();
      if (response === 'OK' && originalRequest) {
        await Api.repeatRequest(originalRequest);
      }
    }
    else if (error.response?.status === 403) {
      await router.push('/signIn');
    }
  }

  const initApp = async () => {
    Api.addInterceptor(axiosInterceptor);
  }

  return {
    appTitle,
    initApp,
  }
});
