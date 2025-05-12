import { ref, watchEffect } from 'vue';
import { useAnalytics } from './useAnalytics';
import { ChartData, ChartOptions } from 'chart.js';

export function useLineChart() {
  const { analyticsData } = useAnalytics();
  
  const chartData = ref<ChartData<'line'>>({
    labels: [],
    datasets: []
  });

  const chartOptions = ref<ChartOptions<'line'>>({
    responsive: true,
    scales: {
      x: {
        ticks: {
          callback: function(value, index) {
            return index % 4 === 0 ? this.getLabelForValue(+value) : '';
          },
          autoSkip: true,
          maxTicksLimit: 6
        }
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true
      }
    }
  });

  watchEffect(() => {
    if (!analyticsData.value) return;
  
    chartData.value = {
      labels: analyticsData.value.hourlyDistribution.map(h => `${h.hour}:00`),
      datasets: [{
        label: 'Активность по часам',
        data: analyticsData.value.hourlyDistribution.map(h => h.count),
        borderColor: '#ff2d88',
        tension: 0.2,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
      }],
    };
  });

  return {
    chartData,
    chartOptions
  };
}