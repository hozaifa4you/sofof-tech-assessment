import {
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   UseGuards,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { AuthUser } from '@/auth/decorators/auth-user.decorator';
import type { AuthUserType } from '@/types/auth-user';

@UseGuards(JwtGuard)
@Controller('calendar')
export class CalendarController {
   constructor(private readonly calendarService: CalendarService) {}

   @HttpCode(HttpStatus.OK)
   @Get()
   findAll(@AuthUser() user: AuthUserType) {
      return this.calendarService.findAll(user.id);
   }
}
