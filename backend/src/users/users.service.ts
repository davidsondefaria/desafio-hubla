import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (existUser && existUser.email) {
      throw new ConflictException('User already exists!');
    }
    const createdUser = await this.userRepository.create(user);
    const savedUser = await this.userRepository.save(createdUser);
    delete savedUser.password;
    return savedUser;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({
      email,
    });
  }
}
