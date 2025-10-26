import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { authApi } from '../api/auth.ts';
import { useUser } from './user.ts';

export const useAuth = defineStore('auth', () => {
  const router = useRouter();
  const { currentUser } = storeToRefs(useUser());

  const email = ref<string>('');
  const password = ref<string>('');
  const repeatPassword = ref<string>('');
  const name = ref<string>('');

  const testEmailRE = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const emailRules = ref([
    (value: string) => !!value || 'Email is required',
    (value: string) => testEmailRE.test(value) || 'Email is invalid',
  ]);

  const testPassRE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const passRules = ref([
    (value: string) => !!value || 'Password is required',
    (value: string) => testPassRE.test(value) || 'Password is invalid',
  ]);

  const repeatPassRules = ref([
    (value: string) => !!value || 'Password is required',
    (value: string) => password.value === value || 'Passwords are not equal',
  ]);

  const nameRules = ref([
    (value: string) => !!value || 'Name is required',
    (value: string) => value.length > 2 || 'Name must be at least 2 characters',
  ]);

  const clearFields = () => {
    email.value = '';
    password.value = '';
    repeatPassword.value = '';
    name.value = '';
  };

  const register = async () => {
    try {
      currentUser.value = await authApi.register({
        email: email.value,
        name: name.value,
        password: password.value,
      });
      clearFields();
      await router.push({ name: 'Main' });
    } catch (e) {
      console.log(e);
    }
  };

  const login = async () => {
    try {
      currentUser.value = await authApi.login({
        email: email.value,
        password: password.value,
      });
      clearFields();
      await router.push({ name: 'Main' });
    } catch (e) {
      console.log(e);
    }
  };
  return {
    email,
    password,
    repeatPassword,
    name,
    emailRules,
    passRules,
    repeatPassRules,
    nameRules,
    register,
    login,
  };
});
