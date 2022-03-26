import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationDto } from './dto/conversation.dto';
import { Conversation, Message } from '@prisma/client';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @ApiOkResponse({ description: 'Conversation started successful.' })
  @Post()
  async startConversation(
    @Body() conversation: ConversationDto,
  ): Promise<Conversation> {
    return await this.conversationService.create(conversation);
  }

  @ApiOkResponse({ description: 'Returns all messages from a conversation.' })
  @Get(':conversationId')
  async getConversationMessages(
    @Param('conversationId') conversationId: string,
  ): Promise<Message[]> {
    return await this.conversationService.getMessages(conversationId);
  }
}
