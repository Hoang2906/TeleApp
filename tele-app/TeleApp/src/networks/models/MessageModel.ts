import UserProfileModel from './UserProfileModel';

export default interface MessageModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  sender: UserProfileModel;

  // status
  status: 'sent' | 'sending' | 'error';
}
