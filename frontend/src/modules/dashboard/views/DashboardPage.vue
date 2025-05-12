<template>
  <div>
    <div class="box-of-blocks">
      <div v-for="(item) in statsBlocks" :key="item.id" class="block">
        <p class="title">{{ item.title }}</p>
        <p class="value">{{ item.value }}</p>
      </div>
    </div>
    <div class="line-and-pie-box">
      <div class="chart-container">
        <p>Распределение звонков по часам</p>
        <LineChart :chartData="lineChartData" :options="lineChartOptions" />
      </div>
      <div class="chart-container">
        <p>Статусы звонков</p>
        <canvas ref="pieChartCanvas"></canvas>
      </div>
    </div>
    <div class="chart-container">
      <BarChart 
        :data="categoryAnalytics" 
        color="#ff2d88" 
        :showLegend="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineChart from '../../../components/charts/LineChart.vue';
import BarChart from '../../../components/charts/BarChart.vue';
import { useLineChart } from '../composables/useLineChart';
import { usePieChart } from '../composables/usePieChart';
import { useAnalytics } from '../composables/useAnalytics';

export default defineComponent({
  name: 'DashboardPage',
  components: { LineChart, BarChart },
  setup() {
    // const { statsBlocks } = useStatsBlocks();
    const { chartData: lineChartData, chartOptions: lineChartOptions } = useLineChart();
    const { chartCanvas: pieChartCanvas } = usePieChart();
    const { categoryAnalytics, statsBlocks } = useAnalytics();

    return {
      statsBlocks,
      lineChartData,
      lineChartOptions,
      pieChartCanvas,
      categoryAnalytics
    };
  }
});
</script>

<style scoped>
.box-of-blocks {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.block {
  padding: 20px;
  background: white;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: var(--text-color);
  margin: 0;
  font-size: 14px;
}

.value {
  color: var(--accent-text-color);
  font-size: 24px;
  font-weight: 600;
  margin: 8px 0 0 0;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    width: 100%;
    height: 80%;
  }
}
.line-and-pie-box{
  display: flex;
  gap: 20px;
  height: 300px;
  margin-bottom: 20px;
  > div{ 
    width: 50%;
  }
}
</style>