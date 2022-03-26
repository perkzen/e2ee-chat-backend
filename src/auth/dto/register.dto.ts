import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public password1: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public password2: string;
}
