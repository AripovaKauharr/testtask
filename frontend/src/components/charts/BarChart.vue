<template>
  <div class="bar-chart-container">
    <Bar
      :data="chartData"
      :options="mergedOptions"
      :style="{ height: height }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

export type DataItem = {
  label: string
  value: number
  color?: string
}

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
      required: true,
      validator: (data: DataItem[]) => 
        data.every(item => 'label' in item && 'value' in item)
    },
    height: {
      type: String,
      default: '300px'
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    customOptions: {
      type: Object as PropType<ChartOptions<'bar'>>,
      default: () => ({})
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const chartData = computed(() => ({
      labels: props.data.map(item => item.label),
      datasets: [{
        label: '',
        data: props.data.map(item => item.value),
        backgroundColor: props.data.map(item => item.color || '#ff2d88'),
        borderWidth: 0,
        borderRadius: 4
      }]
    }))

    const defaultOptions = computed<ChartOptions<'bar'>>(() => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: props.horizontal ? 'y' : 'x',
      plugins: {
        legend: {
          display: props.showLegend
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => `${context.parsed[props.horizontal ? 'x' : 'y']}%`
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            color: '#6b7280'
          },
          ...(props.horizontal ? { beginAtZero: true } : {})
        },
        y: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            color: '#6b7280'
          },
          ...(!props.horizontal ? { beginAtZero: true } : {})
        }
      }
    }))

    const mergedOptions = computed(() => ({
      ...defaultOptions.value,
      ...props.customOptions
    }))

    return {
      chartData,
      mergedOptions
    }
  }
})
</script>

<style scoped>
.bar-chart-container {
  position: relative;
  width: 100%;
}
</style>