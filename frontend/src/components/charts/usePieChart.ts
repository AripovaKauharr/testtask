import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables, type ChartTypeRegistry, type ChartDataset } from 'chart.js';
import { PieChartProps } from './types';

export function usePieChart(canvas: HTMLCanvasElement | null, props: PieChartProps) {
  const chartInstance = ref<Chart<'pie', number[], string> | null>(null);

  const initChart = () => {
    if (!canvas) return;

    Chart.register(...registerables);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    chartInstance.value = new Chart<'pie', number[], string>(ctx, {
      type: 'pie',
      data: props.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        ...props.options
      }
    });
  };
  const updateChart = () => {
    if (!chartInstance.value) return;
    chartInstance.value.data = props.chartData;
    chartInstance.value.update();
  };

  const destroyChart = () => {
    if (chartInstance.value) {
      chartInstance.value.destroy();
      chartInstance.value = null;
    }
  };

  onMounted(initChart);
  onBeforeUnmount(destroyChart);
  watch(() => props.chartData, updateChart, { deep: true });

  return { chartInstance };
}