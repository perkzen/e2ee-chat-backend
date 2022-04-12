import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConversationDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public senderId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public receiverId: string;
}
