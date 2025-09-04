import { AuthUserType } from '@/types/auth-user';
import { JwtPayload } from '@/types/jwt-payload';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserRepository } from '@/user/user.repository';
import {
   BadRequestException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly jwtService: JwtService,
   ) {}

   public async signup(createUserDto: CreateUserDto) {
      const existingUser = await this.userRepository.findByEmail(
         createUserDto.email,
      );
      if (existingUser) {
         throw new BadRequestException('User already exist with the email');
      }

      const hashedPass = await argon.hash(createUserDto.password);
      createUserDto.password = hashedPass;

      await this.userRepository.create(createUserDto);
      return { success: true };
   }

   public async signin(user: AuthUserType) {
      const tokens = await this.generateTokens(user.id);
      return { user, ...tokens };
   }

   public async validateUser(email: string, password: string) {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
         throw new NotFoundException('Invalid credentials');
      }

      const isMatch = await argon.verify(user.password, password);
      if (!isMatch) {
         throw new NotFoundException('Invalid credentials');
      }

      return {
         id: user.id,
         name: user.name,
         email: user.email,
      };
   }

   public async validateJwtUser(userId: number) {
      const user = await this.userRepository.findById(userId);
      if (!user) throw new NotFoundException('User not found');

      const authUser: AuthUserType = {
         id: user.id,
         name: user.name,
         email: user.email,
      };

      return authUser;
   }

   private async generateTokens(userId: number) {
      const payload: JwtPayload = { sub: userId };

      const [access_token] = await Promise.all([
         this.jwtService.signAsync(payload),
      ]);

      return { access_token };
   }
}
