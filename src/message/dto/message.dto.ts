import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public text: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public senderId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public conversationId: string;
}
