import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';

@Module({
   imports: [
      TypeOrmModule.forFeature([Todo]),
      ConfigModule.forFeature(appConfig),
   ],
   controllers: [TodoController],
   providers: [TodoService, TodoRepository],
   exports: [TodoRepository, TodoService],
})
export class TodoModule {}
