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

   async findAll(userId: number) {
      return this.todoRepository.find({
         where: { user: { id: userId } },
         order: { created_at: 'desc' },
      });
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
