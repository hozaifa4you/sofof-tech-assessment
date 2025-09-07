import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@/todo/entities/todo.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Todo])],
   controllers: [AnalyticsController],
   providers: [AnalyticsService],
})
export class AnalyticsModule {}
