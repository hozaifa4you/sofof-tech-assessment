import { Todo } from '@/todo/entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
   constructor(
      @InjectRepository(Todo)
      private readonly todoRepository: Repository<Todo>,
   ) {}

   public async getWeeklyTodoAnalytics() {}

   public async getTodoStatusReport() {}
}
