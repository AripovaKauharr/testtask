import type { ChartData, ChartOptions } from 'chart.js';

export interface PieChartProps {
  chartData: ChartData<'pie', number[], string>;
  options?: ChartOptions<'pie'>;
}

export interface LineChartProps {
  chartData: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}