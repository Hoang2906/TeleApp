import UserChatModel from './UserChatModel';

export default interface ChatModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  users: UserChatModel[];
  last_message:
    | {
        id: number;
        createdAt: string;
        updatedAt: string;
        content: string;
      }
    | undefined;
}
