import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { UserModule } from '@/user/user.module';

@Module({
   providers: [AuthService],
   controllers: [AuthController],
   imports: [UserModule],
})
export class AuthModule {}
