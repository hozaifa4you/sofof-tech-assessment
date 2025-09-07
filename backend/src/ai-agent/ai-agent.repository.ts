import { Todo } from '@/todo/entities/todo.entity';
import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AiAgentRepository {
   constructor(
      @InjectRepository(User) private readonly userRepo: Repository<User>,
      @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
   ) {}

   public async findAllTodosCountForAUser(parameters: { userId: number }) {
      return this.todoRepo.count({
         where: { user: { id: parameters.userId } },
      });
   }

   public async findTodosStatusCount(parameters: { userId: number }) {
      const done = await this.todoRepo.count({
         where: { user: { id: parameters.userId }, status: 'done' },
      });

      const pending = await this.todoRepo.count({
         where: { user: { id: parameters.userId }, status: 'pending' },
      });

      const inProgress = await this.todoRepo.count({
         where: { user: { id: parameters.userId }, status: 'in_progress' },
      });

      const canceled = await this.todoRepo.count({
         where: { user: { id: parameters.userId }, status: 'canceled' },
      });

      return { done, pending, inProgress, canceled };
   }

   public async findFirstTodo({ userId }: { userId: number }) {
      return this.todoRepo.findOne({
         where: { user: { id: userId } },
         order: { created_at: 'ASC' },
      });
   }

   public async findLatestTodo(parameters: { userId: number }) {
      return this.todoRepo.findOne({
         where: { user: { id: parameters.userId } },
         order: { created_at: 'DESC' },
      });
   }

   public async findUserById(parameters: { userId: number }) {
      return this.userRepo.findOne({
         where: { id: parameters.userId },
         select: ['id', 'created_at', 'email', 'name', 'updated_at'],
      });
   }

   public async findAllUsersCount() {
      return this.userRepo.count();
   }

   public async findTodoDetails(parameters: { todoId: number }) {
      return this.todoRepo.findOne({
         where: { id: parameters.todoId },
         select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            date: true,
            created_at: true,
            updated_at: true,
            user: {
               id: true,
               email: true,
               name: true,
               created_at: true,
               updated_at: true,
            },
         },
      });
   }

   public async findAllTodosCount() {
      return this.todoRepo.count();
   }

   public async findAllTodosStatusCount() {
      const done = await this.todoRepo.count({ where: { status: 'done' } });
      const pending = await this.todoRepo.count({
         where: { status: 'pending' },
      });
      const inProgress = await this.todoRepo.count({
         where: { status: 'in_progress' },
      });
      const canceled = await this.todoRepo.count({
         where: { status: 'canceled' },
      });
      return { done, pending, inProgress, canceled };
   }
}
