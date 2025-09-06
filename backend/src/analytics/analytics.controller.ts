import {
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { AuthUser } from '@/auth/decorators/auth-user.decorator';
import type { AuthUserType } from '@/types/auth-user';

@UseGuards(JwtGuard)
@Controller('analytics')
export class AnalyticsController {
   constructor(private readonly analyticsService: AnalyticsService) {}

   @HttpCode(HttpStatus.OK)
   @Get('weekly-reports')
   async getWeeklyTodoAnalytics(@AuthUser() user: AuthUserType) {
      return this.analyticsService.getWeeklyTodoAnalytics(user.id);
   }

   @HttpCode(HttpStatus.OK)
   @Get('status-reports')
   async getTodoStatusReport(@AuthUser() user: AuthUserType) {
      return this.analyticsService.getTodoStatusReport(user.id);
   }
}
