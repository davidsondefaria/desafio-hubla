import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  password: string;
}
