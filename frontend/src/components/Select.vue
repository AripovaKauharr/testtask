<template>
  <div class="select-container">
    <label v-if="label" :for="id">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      @change="handleChange"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    >
      <option v-if="placeholder" value="" disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    options: {
      type: Array,
      required: true,
      validator: (options) =>
        options.every(
          (option) =>
            typeof option === 'object' &&
            'value' in option &&
            'label' in option
        )
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
      default: () => `select-${Math.random().toString(36).substr(2, 9)}`
    }
  },
  emits: ['blur', 'focus', 'status', 'change'],
  methods: {
    handleChange(event) {
      this.$emit('change', event);
    }
  }
}
</script>

<style scoped>
.select-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

select {
  padding: 15px 35px 15px 15px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;

  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0px 0px 8px 0px #ececec;
}

select:focus {
  outline: none;
  box-shadow: 0 0 4px 2px var(--main-color-300);
}

select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>