import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { UserRepository } from '@/user/user.repository';

@Injectable()
export class UserService {
   constructor(private readonly userRepository: UserRepository) {}

   findAll() {
      return `This action returns all user`;
   }

   findOne(id: number) {
      return `This action returns a #${id} user`;
   }

   update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
   }

   remove(id: number) {
      return `This action removes a #${id} user`;
   }
}
