import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@/todo/entities/todo.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Todo])],
   providers: [CalendarService],
   controllers: [CalendarController],
})
export class CalendarModule {}
