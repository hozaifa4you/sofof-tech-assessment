import { Todo } from '@/todo/entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CalendarService {
   constructor(
      @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
   ) {}

   public async findAll(userId: number) {
      const todos = await this.todoRepository.find({
         where: { user: { id: userId } },
      });

      const events = todos.map((todo) => ({
         title: todo.title,
         description: todo.description,
         start: todo.date,
         end: todo.extra_json?.end ?? todo.date,
         allDay: todo.extra_json?.allDay,
         color: todo.extra_json?.color,
         location: todo.extra_json?.location,
         status: todo.status,
         priority: todo.priority,
      }));

      return events;
   }
}
