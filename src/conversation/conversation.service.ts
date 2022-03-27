import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConversationDto } from './dto/conversation.dto';

@Injectable()
export class ConversationService {
  constructor(private db: PrismaService) {}

  async create(conversation: ConversationDto) {
    const dbConversation = await this.db.conversation.findFirst({
      where: {
        users: { hasEvery: [conversation.senderId, conversation.receiverId] },
      },
    });

    if (!dbConversation) {
      const newConversation = await this.db.conversation.create({
        data: { users: [conversation.senderId, conversation.receiverId] },
      });
      return newConversation.id;
    }
    return dbConversation.id;
  }

  async getMessages(conversationId: string) {
    return await this.db.message.findMany({
      where: {
        conversationId: conversationId,
      },
    });
  }
}
