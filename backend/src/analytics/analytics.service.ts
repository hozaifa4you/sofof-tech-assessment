import { Todo } from '@/todo/entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface WeeklyAnalyticsData {
   month: string;
   created: number;
   done: number;
   date: string;
}

export interface StatusReportData {
   status: string;
   count: number;
}

@Injectable()
export class AnalyticsService {
   constructor(
      @InjectRepository(Todo)
      private readonly todoRepository: Repository<Todo>,
   ) {}

   public async getWeeklyTodoAnalytics(
      userId: number,
   ): Promise<WeeklyAnalyticsData[]> {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const weeklyData: WeeklyAnalyticsData[] = [];
      const dayNames = [
         'Sunday',
         'Monday',
         'Tuesday',
         'Wednesday',
         'Thursday',
         'Friday',
         'Saturday',
      ];

      for (let i = 0; i < 7; i++) {
         const currentDate = new Date(startDate);
         currentDate.setDate(startDate.getDate() + i);

         const dayStart = new Date(currentDate);
         dayStart.setHours(0, 0, 0, 0);

         const dayEnd = new Date(currentDate);
         dayEnd.setHours(23, 59, 59, 999);

         const created = await this.todoRepository
            .createQueryBuilder('todo')
            .leftJoin('todo.user', 'user')
            .where('user.id = :userId', { userId })
            .andWhere('todo.created_at >= :dayStart', { dayStart })
            .andWhere('todo.created_at <= :dayEnd', { dayEnd })
            .getCount();

         const done = await this.todoRepository
            .createQueryBuilder('todo')
            .leftJoin('todo.user', 'user')
            .where('user.id = :userId', { userId })
            .andWhere('todo.status = :status', { status: 'done' })
            .andWhere('todo.updated_at >= :dayStart', { dayStart })
            .andWhere('todo.updated_at <= :dayEnd', { dayEnd })
            .getCount();

         weeklyData.push({
            month: dayNames[currentDate.getDay()],
            created,
            done,
            date: currentDate.toISOString().split('T')[0],
         });
      }

      return weeklyData;
   }

   public async getTodoStatusReport(
      userId: number,
   ): Promise<StatusReportData[]> {
      const statusCounts = await this.todoRepository
         .createQueryBuilder('todo')
         .leftJoin('todo.user', 'user')
         .select('todo.status', 'status')
         .addSelect('COUNT(*)', 'count')
         .where('user.id = :userId', { userId })
         .groupBy('todo.status')
         .getRawMany();

      return statusCounts.map((item) => ({
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
         status: item.status,
         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
         count: parseInt(item.count),
      }));
   }
}
