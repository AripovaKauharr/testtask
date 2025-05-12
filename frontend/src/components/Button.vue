<template>
  <button
    :class="['btn', buttonType, { 'btn-loading': isLoading }]"
    :disabled="isLoading"
    @click="handleClick"
  >
  <span v-if="isLoading">Загрузка...</span>
    <span v-else>
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    text: {
      type: String,
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: 'primary',
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
});
</script>

<style scoped>
.btn {
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  height: fit-content;
  transition: background-color 0.3s;
}

.primary {
  background-color: var(--main-color);
  color: white;
}
.outlined{
  border: 1px solid;
  border-color: var(--main-color);
  background: white;
  color: var(--main-color-500);
}
.outlined:hover{
  border: 1px solid;
  border-color: var(--main-color);
  background: var(--main-color-500);
  color: white;
}

.primary:hover {
  background-color: var(--main-color-700);
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.secondary:hover {
  background-color: #5a6268;
}

.loading {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
