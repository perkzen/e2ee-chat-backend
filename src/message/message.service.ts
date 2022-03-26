import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(private db: PrismaService) {}

  async save(message: MessageDto) {
    return await this.db.message.create({
      data: { ...message },
    });
  }
}
