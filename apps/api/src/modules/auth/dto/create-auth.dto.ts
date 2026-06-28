import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  name: string;
}
