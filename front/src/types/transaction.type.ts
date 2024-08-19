import type { IUser } from './user.type';

export type ITransaction = {
  id: string;
  senderId: string;
  recipientId: string;
  amount: string;
  createdAt: string;
  updatedAt: string;

  recipient: IUser;
  sender: IUser;
};
