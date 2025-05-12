import { onMounted, watchEffect } from "vue";
import { getAnalytics } from "../service";
import { AnalyticsData, AnalyticsFilters } from "../types/analytics.type";
import { ref } from "vue";
import { DataItem } from "../../../components/charts/BarChart.vue";

export function useAnalytics () {
  const analyticsData = ref<AnalyticsData | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const categoryAnalytics = ref<DataItem[]>([
        {
          label: "billing",
          value: 0
        },
        {
          label: "technical",
          value: 0
        },
        {
          label: "general",
          value: 0
        }
    ])
  const statsBlocks = ref([
    {id: 1, title: "Всего звонков", value: "0"},
    {id: 2, title: "Среднее время разговора", value: "0"},
    {id: 3, title: "Пропущенные звонки", value: "0"}
  ])

  const getAnalyticStats = async (filters: AnalyticsFilters) => {
     try {
      const response = await getAnalytics(filters);
      analyticsData.value = response;
      if (response) {
        const totalCalls = response.statusDistribution.reduce((sum, item) => sum + item.count, 0);
        statsBlocks.value = [
          { id: 1, title: "Всего звонков", value: totalCalls.toString() },
          { id: 2, title: "Среднее время разговора", value: response.averageCompletedDuration },
          { id: 3, title: "Пропущенные звонки", value: `${response.missedPercentage}%` }
        ];
        categoryAnalytics.value = response.categoryDistribution.map(item => ({
          label: item.category.charAt(0).toUpperCase() + item.category.slice(1), 
          value: item.percentage
        }))
      }
     } catch (err) {
       console.error(err);
     }
   };

   watchEffect(() => {
    if (!analyticsData.value) return;
    const status = analyticsData.value.statusDistribution;
  });
  onMounted(() => {
    getAnalyticStats({
      from: "2025-04-01",
      to: "2025-05-23",
      category: "",
      status: "",
    });
  });

  return { getAnalyticStats, statsBlocks, analyticsData, categoryAnalytics }
}