<template>
  <div class="login-block">
    <div class="logo-immitation">
      <h1>O!</h1>
    </div>
    <h2 class="login-title">Вход в систему</h2>
    <p>Аналитика звонков колл-центра</p>
    <LoginForm
      @submit="handleSubmit"
      :error-message="errorMessage"
      :is-submitting="isSubmitting"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '../../../components/Button.vue';
import LoginForm from '../components/LoginForm.vue';
import { useLogin } from '../composables/useLogin';
import { CreateLoginForm } from '../types/login.types';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Button,
    LoginForm
  },
  setup() {
    const { 
      errorMessage,
      isSubmitting,
      handleLogin
    } = useLogin()
    const handleSubmit = async (form: CreateLoginForm) => {
      await handleLogin(form);
    };
    return {
      errorMessage,
      isSubmitting,
      handleLogin,
      handleSubmit
    }
  }
});
</script>

<style scoped>
.login-block {
  text-align: center;
  width: 350px;
  margin: 15dvh auto;
  padding: 20px 40px;
  background-color: white;
  border: 1px solid var(--main-color);
  border-radius: 12px;
}
.login-title {
  margin-bottom: 5px;
}
.logo-immitation {
  border-radius: 100%;
  width: 70px;
  height: 70px;
  background-color: var(--main-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
}
.logo-immitation h1 {
  font-size: 30px;
  margin-bottom: 5px;
}
.login-form {
  margin-top: 15px;
}
.login-btn {
  margin-top: 20px;
  width: 100%;
}
.brand-signature {
  margin-top: 20px;
  font-size: 10px;
}
.error-message {
  color: red;
  margin: 10px 0;
  min-height: 20px;
}
</style>