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
import { IAuthUser, IMessage, ISocketUser } from '../types/interfaces';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  connectedSockets: Map<string, ISocketUser> = new Map<string, ISocketUser>();

  @SubscribeMessage('send_message')
  handleSendMessage(@MessageBody() message: IMessage) {
    const receiver = this.connectedSockets.get(message.receiver.username);
    this.server.to(receiver.socketId).emit('receive_message', message);
  }

  @SubscribeMessage('login')
  handleLogin(
    @ConnectedSocket() client: Socket,
    @MessageBody() user: IAuthUser,
  ) {
    this.connectedSockets.set(user.username, {
      socketId: client.id,
      id: user.id,
      username: user.username,
      publicKey: user.publicKey,
    });
    this.server.emit('fetchUsers', Array.from(this.connectedSockets.values()));
  }

  @SubscribeMessage('logout')
  handleLogout(@ConnectedSocket() client: Socket) {
    const user = client.handshake.auth as IAuthUser;
    this.connectedSockets.delete(user.username);
    this.server.emit('fetchUsers', Array.from(this.connectedSockets.values()));
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const user = client.handshake.auth as IAuthUser;
    this.connectedSockets.delete(user.username);
    this.server.emit('fetchUsers', Array.from(this.connectedSockets.values()));
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const user = client.handshake.auth as IAuthUser;

    if (user.username)
      this.connectedSockets.set(user.username, {
        socketId: client.id,
        id: user.id,
        username: user.username,
        publicKey: user.publicKey,
      });

    if (user.id) {
      this.handleLogin(client, user);
    }
  }
}
