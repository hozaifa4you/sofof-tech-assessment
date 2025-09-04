import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository {
   constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
   ) {}

   public async create(createUserDto: CreateUserDto) {
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
   }

   public async update() {}
   public async findAll() {}

   public async findByEmail(email: string) {
      return this.userRepository.findOne({ where: { email } });
   }

   public async delete() {}
}
