export interface HourlyDistribution {
  hour: number;
  count: number;
}

export interface StatusDistribution {
  status: 'completed' | 'missed' | 'rejected';
  count: number;
  percentage: number;
}

export interface AvgDurationByCategory {
  category: string;
  averageDuration: number;
  averageDurationFormatted: string;
}
export interface CategoryDistribution {
  category: string
  percentage: number
}
export interface AnalyticsData {
  averageCompletedDuration: string;
  missedPercentage: number;
  hourlyDistribution: HourlyDistribution[];
  statusDistribution: StatusDistribution[];
  avgDurationByCategory: AvgDurationByCategory[];
  categoryDistribution: CategoryDistribution[]
}

export interface AnalyticsFilters {
  from: string
  to: string
  category: string
  status: string
}