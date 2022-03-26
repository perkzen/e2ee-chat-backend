import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
