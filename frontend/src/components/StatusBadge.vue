<template>
  <div :class="['status', type]">{{value}}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "StatusBadge",
  props: {
    value:{
      type: String,
      required: true,
    },
    type:{
      type: String,
    }
  },
})
</script>
<style scope>
.status{
  border-radius: 4px;
  background-color: var(--main-color-50);
  color: var(--main-color-700);
  padding: 5px 15px;
  text-align: center;
}
.completed {
  background-color: var(--completed-color-50);
  color: var(--completed-color-500);
}
.rejected{
  background-color: var(--rejected-color-50);
  color: var(--rejected-color-500);
}
.missed{
  background-color: var(--missed-color-50);
  color: var(--missed-color-500);
}
</style>