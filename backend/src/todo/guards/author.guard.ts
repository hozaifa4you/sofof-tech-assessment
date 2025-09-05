import { AuthUserType } from '@/types/auth-user';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TodoRepository } from '@/todo/todo.repository';

@Injectable()
export class AuthorGuard implements CanActivate {
   constructor(private readonly todoRepository: TodoRepository) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context
         .switchToHttp()
         .getRequest<Request & { user: AuthUserType }>();
      const userId = request.user.id;
      const todoId = Number(request.params.id);

      const todo = await this.todoRepository.findById(todoId);
      if (!todo) return true;

      if (todo.user.id !== userId) return false;

      return true;
   }
}
