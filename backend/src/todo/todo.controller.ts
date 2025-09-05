import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   HttpCode,
   HttpStatus,
   UseGuards,
} from '@nestjs/common';
import { TodoService } from '@/todo/todo.service';
import { CreateTodoDto } from '@/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@/todo/dto/update-todo.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { AuthUser } from '@/auth/decorators/auth-user.decorator';
import type { AuthUserType } from '@/types/auth-user';
import { AuthorGuard } from '@/todo/guards/author.guard';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
   constructor(private readonly todoService: TodoService) {}

   @HttpCode(HttpStatus.CREATED)
   @Post()
   async create(
      @Body() createTodoDto: CreateTodoDto,
      @AuthUser() user: AuthUserType,
   ) {
      return this.todoService.create(user.id, createTodoDto);
   }

   @HttpCode(HttpStatus.OK)
   @Get()
   async findAll(@AuthUser() user: AuthUserType) {
      return this.todoService.findAll(user.id);
   }

   @HttpCode(HttpStatus.OK)
   @Get(':id')
   async findById(@Param('id') id: string) {
      return this.todoService.findById(+id);
   }

   @HttpCode(HttpStatus.OK)
   @UseGuards(AuthorGuard)
   @Patch(':id')
   async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
      return this.todoService.update(+id, updateTodoDto);
   }

   @HttpCode(HttpStatus.NO_CONTENT)
   @UseGuards(AuthorGuard)
   @Delete(':id')
   async remove(@Param('id') id: string) {
      return this.todoService.remove(+id);
   }
}
