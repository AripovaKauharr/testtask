import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getAnalytics(@Query('from') from: string, @Query('to') to: string) {
    return this.analyticsService.getAllAnalytics(new Date(from), new Date(to));
  }
}
