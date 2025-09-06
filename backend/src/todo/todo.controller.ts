import {
   Controller,
   Get,
   Post,
   Body,
   Param,
   Delete,
   HttpCode,
   HttpStatus,
   UseGuards,
   UseInterceptors,
   UploadedFile,
   Query,
   Put,
} from '@nestjs/common';
import { TodoService } from '@/todo/todo.service';
import { CreateTodoDto } from '@/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@/todo/dto/update-todo.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { AuthUser } from '@/auth/decorators/auth-user.decorator';
import type { AuthUserType } from '@/types/auth-user';
import { AuthorGuard } from '@/todo/guards/author.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import fs from 'fs';
import path from 'path';
import { GetTodoDatePipe } from './pipes/get-todo-date.pipe';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
   constructor(private readonly todoService: TodoService) {}

   @HttpCode(HttpStatus.CREATED)
   @UseInterceptors(
      FileInterceptor('image', {
         storage: diskStorage({
            destination: (file, req, callback) => {
               const uploadpath = './public/uploads';

               if (!fs.existsSync(uploadpath)) {
                  fs.mkdirSync(uploadpath, { recursive: true });
               }

               callback(null, uploadpath);
            },
            filename: (req, file, callback) => {
               const rawFilename = file.originalname
                  .replace(/\.[^/.]+$/, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase();
               const extName = path.extname(file.originalname);
               const filename = `${rawFilename}-${Date.now()}${extName}`;

               callback(null, filename);
            },
         }),
      }),
   )
   @Post()
   async create(
      @Body() createTodoDto: CreateTodoDto,
      @AuthUser() user: AuthUserType,
      @UploadedFile() file?: Express.Multer.File,
   ) {
      return this.todoService.create(user.id, createTodoDto, file);
   }

   @HttpCode(HttpStatus.OK)
   @Get()
   async findAll(
      @AuthUser() user: AuthUserType,
      @Query('date', GetTodoDatePipe) date?: Date,
   ) {
      return this.todoService.findAll(user.id, date);
   }

   @HttpCode(HttpStatus.OK)
   @Get(':id')
   async findById(@Param('id') id: string) {
      return this.todoService.findById(+id);
   }

   @HttpCode(HttpStatus.OK)
   @UseInterceptors(
      FileInterceptor('image', {
         storage: diskStorage({
            destination: (file, req, callback) => {
               const uploadpath = './public/uploads';

               if (!fs.existsSync(uploadpath)) {
                  fs.mkdirSync(uploadpath, { recursive: true });
               }

               callback(null, uploadpath);
            },
            filename: (req, file, callback) => {
               const rawFilename = file.originalname
                  .replace(/\.[^/.]+$/, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase();
               const extName = path.extname(file.originalname);
               const filename = `${rawFilename}-${Date.now()}${extName}`;

               callback(null, filename);
            },
         }),
      }),
   )
   @UseGuards(AuthorGuard)
   @Put(':id')
   async update(
      @Param('id') id: string,
      @Body() updateTodoDto: UpdateTodoDto,
      @UploadedFile() file?: Express.Multer.File,
   ) {
      return this.todoService.update(+id, updateTodoDto, file);
   }

   @HttpCode(HttpStatus.NO_CONTENT)
   @UseGuards(AuthorGuard)
   @Delete(':id')
   async remove(@Param('id') id: string) {
      return this.todoService.remove(+id);
   }
}
