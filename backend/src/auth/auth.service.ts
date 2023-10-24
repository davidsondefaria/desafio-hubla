import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async login(payload: RegisterDto): Promise<ResponseDto> {
    const user = await this.usersService.findByEmail(payload.email);

    const validPassword = await this.comparePasswords(
      payload.password,
      user.password,
    );

    if (!user || !validPassword) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    const accessToken = await this.generateToken(user.email);

    return {
      success: true,
      data: { user, accessToken },
      message: 'You have been successfully logged!',
    };
  }

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

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
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
