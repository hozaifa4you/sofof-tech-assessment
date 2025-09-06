import {
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtGuard } from '@/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('analytics')
export class AnalyticsController {
   constructor(private readonly analyticsService: AnalyticsService) {}

   @HttpCode(HttpStatus.OK)
   @Get('weekly-reports')
   public async getWeeklyTodoAnalytics() {
      return this.analyticsService.getWeeklyTodoAnalytics();
   }

   @HttpCode(HttpStatus.OK)
   @Get('status-reports')
   public async getTodoStatusReport() {
      return this.analyticsService.getTodoStatusReport();
   }
}
