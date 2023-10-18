import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    description: 'User email and password',
    type: RegisterDto,
  })
  @ApiOkResponse({
    description: 'User has been registered successfully',
    type: ResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'An email and password must be provided',
  })
  register(@Body() body: RegisterDto): Promise<ResponseDto> {
    return this.authService.register(body);
  }
}
