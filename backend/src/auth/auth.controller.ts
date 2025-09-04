import {
   Body,
   Controller,
   HttpCode,
   HttpStatus,
   Post,
   UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { AuthUser } from '@/auth/decorators/auth-user.decorator';
import type { AuthUserType } from '@/types/auth-user';
import { LocalGuard } from '@/auth/guards/local.guard';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @HttpCode(HttpStatus.CREATED)
   @Post('signup')
   async signup(@Body() createUserDto: CreateUserDto) {
      return this.authService.signup(createUserDto);
   }

   @HttpCode(HttpStatus.OK)
   @UseGuards(LocalGuard)
   @Post('signin')
   async signin(@AuthUser() user: AuthUserType) {
      return this.authService.signin(user);
   }
}
