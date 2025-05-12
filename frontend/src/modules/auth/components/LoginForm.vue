<template>
   <form @submit.prevent="submitForm" class="login-form">
      <Input
        v-model="form.email"
        label="Имя пользователя"
        placeholder="Введите ваш email"
        type="email"
      />
      
      <Input
        v-model="form.password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
      />
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <Button
        type="submit"
        text="Войти"
        :isLoading="isSubmitting"
        :onClick="submitForm"
        buttonType="primary"
        class="login-btn"
      />

      <p class="brand-signature">© 2025 Мобильный оператор "O!"</p>
    </form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Input from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';

export default defineComponent({
  components: { Input, Button },
  props: {
    errorMessage: String,
    isSubmitting: Boolean
  },
  emits: ['submit'],
  setup(_, { emit }) {
    const form = reactive({
      email: '',
      password: ''
    });

    const submitForm = () => {
      emit('submit', { ...form });
    };

    return { form, submitForm };
  }
});
</script>