import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      });
   }

   async update(id: number, updateTodoDto: UpdateTodoDto) {
      await this.todoRepository.update(id, updateTodoDto);
      return this.todoRepository.findOneBy({ id });
   }

   async remove(id: number) {
      return this.todoRepository.delete(id);
   }
}
