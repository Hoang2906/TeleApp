import UserProflileModel from './UserProfileModel';

export default interface UserModel {
  access_token: string;
  user: UserProflileModel;
}
