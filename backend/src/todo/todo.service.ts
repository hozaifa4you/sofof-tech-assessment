import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';
import appConfig from '@/config/app.config';
import { type ConfigType } from '@nestjs/config';
import path from 'path';

@Injectable()
export class TodoService {
   constructor(
      private readonly todoRepository: TodoRepository,
      @Inject(appConfig.KEY)
      private readonly config: ConfigType<typeof appConfig>,
   ) {}

   async create(
      userId: number,
      createTodoDto: CreateTodoDto,
      file?: Express.Multer.File,
   ) {
      if (file) {
         const filepath = `/uploads/${file.filename}`;
         const url = path.join(this.config.apiUrl!, filepath);
         createTodoDto.image = url;
      }

      await this.todoRepository.create(userId, createTodoDto);

      return { success: true };
   }

   async findAll(userId: number) {
      return this.todoRepository.findAll(userId);
   }

   async findById(id: number) {
      const todo = await this.todoRepository.findById(id);
      if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

      return todo;
   }

   async update(id: number, updateTodoDto: UpdateTodoDto) {
      const todo = await this.todoRepository.findById(id);
      if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

      await this.todoRepository.update(id, updateTodoDto);

      return { success: true };
   }

   async remove(id: number) {
      const todo = await this.todoRepository.findById(id);
      if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

      await this.todoRepository.remove(id);

      return { success: true };
   }
}
