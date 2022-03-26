import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { ISocketUser } from '../types/interfaces';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  private server: Server;

  users: ISocketUser[] = [];

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() user: { id: string; username: string },
  ) {
    this.users.push({
      id: user.id,
      socketId: client.id,
      username: user.username,
    });
  }

  @SubscribeMessage('leave')
  handleLeave(@ConnectedSocket() client: Socket) {
    this.users = this.users.filter((user) => user.socketId !== client.id);
  }
}