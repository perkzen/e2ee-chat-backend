import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { ISocketUser } from '../types/interfaces';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  connectedSockets: Set<string> = new Set<string>();
  users: ISocketUser[] = [];

  @SubscribeMessage('login')
  handleLogin(
    @ConnectedSocket() client: Socket,
    @MessageBody() user: { id: string; username: string },
  ) {
    if (this.connectedSockets.has(client.id)) {
      this.users.push({
        id: user.id,
        socketId: client.id,
        username: user.username,
      });
    }
    this.server.emit('fetchUsers', this.users);
  }

  @SubscribeMessage('logout')
  handleLogout(@ConnectedSocket() client: Socket) {
    this.users = this.users.filter((user) => user.socketId !== client.id);
    this.server.emit('fetchUsers', this.users);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.users = this.users.filter((user) => user.socketId !== client.id);
    this.connectedSockets.delete(client.id);
    this.server.emit('fetchUsers', this.users);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.connectedSockets.add(client.id);
    const user = client.handshake.auth as ISocketUser;

    if (user.id) {
      this.handleLogin(client, { username: user.username, id: user.id });
    }
  }
}
