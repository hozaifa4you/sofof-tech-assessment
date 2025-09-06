import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from '@/types/todo';

export class TodoRepository {
   constructor(
      @InjectRepository(Todo)
      private readonly todoRepository: Repository<Todo>,
   ) {}

   public async create(userId: number, createTodoDto: CreateTodoDto) {
      const todo = this.todoRepository.create({
         ...createTodoDto,
         date: new Date(createTodoDto.date),
         user: { id: userId },
      });
      return this.todoRepository.save(todo);
   }

   public async findAll(userId: number, date?: Date) {
      const query = this.todoRepository.createQueryBuilder('todo');
      query.where({ user: { id: userId } });
      if (date) {
         query.andWhere('DATE(todo.created_at) = DATE(:date)', { date });
      }
      query.orderBy('todo.created_at', 'DESC');
      return query.getMany();
   }

   public async findById(id: number) {
      return this.todoRepository.findOne({
         where: { id },
         relations: ['user'],
         select: {
            created_at: true,
            date: true,
            description: true,
            id: true,
            image: true,
            title: true,
            priority: true,
            status: true,
            user: { id: true, email: true, name: true },
         },
      });
   }

   public async update(id: number, updateTodoDto: UpdateTodoDto) {
      await this.todoRepository.update(id, updateTodoDto);
      return this.todoRepository.findOneBy({ id });
   }

   public async remove(id: number) {
      return this.todoRepository.delete(id);
   }

   public async findTodaysTodos(userId: number) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return this.todoRepository.find({
         where: {
            user: { id: userId },
            created_at: Between(today, tomorrow),
         },
         order: {
            created_at: 'DESC',
         },
         take: 9,
      });
   }

   public async updateStatus(todoId: number, status: TodoStatus) {
      await this.todoRepository.update(todoId, { status });
      return this.todoRepository.findOneBy({ id: todoId });
   }
}
