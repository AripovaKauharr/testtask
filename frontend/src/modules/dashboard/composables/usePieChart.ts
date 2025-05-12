import { ref, watchEffect } from 'vue';
import { useAnalytics } from '../composables/useAnalytics';
import { Chart, ChartData, ChartOptions } from 'chart.js';

export function usePieChart() {
  const { analyticsData } = useAnalytics();
  const chartCanvas = ref<HTMLCanvasElement | null>(null);

  watchEffect(() => {
    if (!chartCanvas.value || !analyticsData.value) return;
  
    const ctx = chartCanvas.value.getContext('2d');
    if (!ctx) return;
  
    const existingCharts = Chart.getChart(ctx);
    if (existingCharts) existingCharts.destroy();
  
    const labels = analyticsData.value.statusDistribution.map(s => {
      if (s.status === 'completed') return 'Завершенные';
      if (s.status === 'missed') return 'Пропущенные';
      if (s.status === 'rejected') return 'Отклоненные';
      return s.status;
    });
    const data = analyticsData.value.statusDistribution.map(s => s.percentage);
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#ff2d88', '#fb7db3', '#e0e0e0'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 15,
              font: { size: 13 }
            }
          },
          title: {
            display: false,
            text: 'Распределение звонков',
            font: { size: 20 }
          }
        }
      }
    });
  });

  return {
    chartCanvas
  };
}