import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserRepository } from '@/user/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
   constructor(private readonly userRepository: UserRepository) {}

   async signup(createUserDto: CreateUserDto) {
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
}
