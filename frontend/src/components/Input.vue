<template>
  <div class="input-container">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @change="$emit('change', $event)"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'password', 'email', 'number', 'tel'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    }
  },
  emits: ['update:modelValue', 'blur', 'focus', 'change']
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0px 0px 8px 0px #ececec;
}

input:focus {
  outline: none;
  box-shadow: 0 0 4px 2px var(--main-color-300);
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>