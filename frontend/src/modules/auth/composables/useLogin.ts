import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CreateLoginForm } from '../types/login.types';
import { login } from '../service';

export function useLogin() {
  const router = useRouter();
  const errorMessage = ref('');
  const isSubmitting = ref(false);

  const handleLogin = async (form: CreateLoginForm) => {
    errorMessage.value = '';
    
    if (!form.email.trim() || !form.password.trim()) {
      errorMessage.value = 'Пожалуйста, заполните все поля!';
      return false;
    }

    try {
      isSubmitting.value = true;
      await login(form);
      router.push('/dashboard');
      return true;
    } catch (error) {
      errorMessage.value = 'Неверный email или пароль';
      console.error('Auth error:', error);
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    errorMessage,
    isSubmitting,
    handleLogin
  };
}