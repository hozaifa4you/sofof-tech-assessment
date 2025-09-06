import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export class TodoRepository {
   constructor(
      @InjectRepository(Todo)
      private readonly todoRepository: Repository<Todo>,
   ) {}

   async create(userId: number, createTodoDto: CreateTodoDto) {
      const todo = this.todoRepository.create({
         ...createTodoDto,
         date: new Date(createTodoDto.date),
         user: { id: userId },
      });
      return this.todoRepository.save(todo);
   }

   async findAll(userId: number, date?: Date) {
      const query = this.todoRepository.createQueryBuilder('todo');
      query.where({ user: { id: userId } });
      if (date) {
         query.andWhere('DATE(todo.created_at) = DATE(:date)', { date });
      }
      query.orderBy('todo.created_at', 'DESC');
      return query.getMany();
   }

   async findById(id: number) {
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

   async update(id: number, updateTodoDto: UpdateTodoDto) {
      await this.todoRepository.update(id, updateTodoDto);
      return this.todoRepository.findOneBy({ id });
   }

   async remove(id: number) {
      return this.todoRepository.delete(id);
   }

   async findTodaysTodos(userId: number) {
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
      });
   }
}
