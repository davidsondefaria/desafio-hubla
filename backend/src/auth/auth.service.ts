import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { ResponseDto } from './dto/response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(payload: RegisterDto): Promise<ResponseDto> {
    const hashedPassword = await this.hashPassword(payload.password);

    const user = await this.usersService.createUser({
      ...payload,
      password: hashedPassword,
    });

    const accessToken = await this.generateToken(user.email);

    return {
      success: true,
      data: { user, accessToken },
      message: 'You have been successfully registered!',
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async generateToken(email: string) {
    return this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT.SECRET'),
        expiresIn: '1800s',
      },
    );
  }
}
