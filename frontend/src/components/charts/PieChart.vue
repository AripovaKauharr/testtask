<template>
  <div class="pie-chart-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PieChartProps } from './types';
import { usePieChart } from './usePieChart';

const props = defineProps<PieChartProps>();
const canvasRef = ref<HTMLCanvasElement | null>(null);

usePieChart(canvasRef.value, props);
</script>

<style scoped>
.pie-chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>