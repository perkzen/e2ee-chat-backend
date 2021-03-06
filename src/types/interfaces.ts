export interface ILoginResponse {
  id: string;
  username: string;
}

export interface IMessage {
  senderId: string;
  receiver: IAuthUser;
  text: string;
}

export interface ISocketUser {
  id?: string;
  username?: string;
  socketId: string;
  key: string;
}

export interface IAuthUser {
  id: string;
  username: string;
  key: string;
}
