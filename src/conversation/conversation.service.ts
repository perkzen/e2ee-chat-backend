import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConversationDto } from './dto/conversation.dto';
import { diffieHellman } from '../utils/crypto';
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
      const secret = diffieHellman();
      const newConversation = await this.db.conversation.create({
        data: {
          users: [conversation.senderId, conversation.receiverId],
          computedSecret: secret,
        },
      });
      return {
        id: newConversation.id,
        computedSecret: newConversation.computedSecret,
      };
    }
    return {
      id: dbConversation.id,
      computedSecret: dbConversation.computedSecret,
    };
  }

  async getMessages(conversationId: string) {
    return await this.db.message.findMany({
      where: {
        conversationId: conversationId,
      },
    });
  }

  async fetchUser(userId: string) {
    return await this.db.user.findFirst({
      where: { id: userId },
    });
  }

  async getHistory(userId: string) {
    const conversations: Conversation[] = await this.db.conversation.findMany({
      where: { users: { has: userId } },
    });
    const history = [];
    for (let i = 0; i < conversations.length; i++) {
      const messages = await this.getMessages(conversations[i].id);
      const id =
        userId === conversations[i].users[1]
          ? conversations[i].users[1]
          : conversations[i].users[0];
      const user = await this.fetchUser(id);
      history.push({
        ...conversations[i],
        user: user,
        lastMessage: messages.slice(-1).pop(),
      });
    }
    return history;
  }
}
