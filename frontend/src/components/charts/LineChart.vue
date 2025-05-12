<template>
  <div class="line-chart-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Chart, type ChartData, type ChartOptions } from 'chart.js';
interface LineChartProps {
  chartData: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const props = defineProps<LineChartProps>();
const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart<'line'> | null = null;

onMounted(() => {
  if (canvasRef.value) {
    initChart();
  }
});

watch(() => props.chartData, () => {
  if (chartInstance) {
    chartInstance.data = props.chartData;
    chartInstance.update();
  } else if (canvasRef.value) {
    initChart();
  }
}, { deep: true });

function initChart() {
  if (!canvasRef.value) return;
  
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: props.chartData,
    options: props.options || {}
  });
}

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.line-chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>