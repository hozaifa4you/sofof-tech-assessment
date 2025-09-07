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
}
