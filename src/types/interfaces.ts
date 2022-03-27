export interface ILoginResponse {
  id: string;
  username: string;
}

export interface IMessage {
  senderId: string;
  receiverId: string;
  text: string;
}

export interface ISocketUser {
  id?: string;
  username?: string;
  socketId: string;
}
