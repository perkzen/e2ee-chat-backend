import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConversationDto } from './dto/conversation.dto';
import { Conversation } from '@prisma/client';

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
        data: {
          users: [conversation.senderId, conversation.receiverId],
          keyPair: conversation.keyPair,
        },
      });
      return { id: newConversation.id, keyPair: newConversation.keyPair };
    }
    return { id: dbConversation.id, keyPair: dbConversation.keyPair };
  }

  async getMessages(conversationId: string) {
    return await this.db.message.findMany({
      where: {
        conversationId: conversationId,
      },
    });
  }

  async getHistory(userId: string) {
    const conversations: Conversation[] = await this.db.conversation.findMany({
      where: { users: { has: userId } },
    });
    const history = [];
    for (let i = 0; i < conversations.length; i++) {
      const messages = await this.getMessages(conversations[i].id);
      history.push({
        ...conversations[i],
        lastMessage: messages.slice(-1).pop(),
      });
    }
    return history;
  }
}
