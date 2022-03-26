import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Message } from '@prisma/client';

@ApiTags('Chat')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiCreatedResponse({ description: 'Message was saved successfully.' })
  @Post()
  async saveMessage(@Body() message: MessageDto): Promise<Message> {
    return await this.messageService.save(message);
  }
}
