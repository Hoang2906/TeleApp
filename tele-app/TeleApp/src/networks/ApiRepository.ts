import client from './ApiClient';
import BaseResponse from "./models/BaseResponse";
import UserModel from "./models/UserModel";

export default class ApiRepository {
  login(phone_number: string, password: string) {
    return client.post<BaseResponse<UserModel>>('/login', {
      phone_number,
      password,
    });
  }

  getProfile() {
    return client.get('/users/profile');
  }

  getAllChats() {
    return client.get('/chat/list-chat');
  }

  createConversation() {
    return client.post('/chat/create-conversation');
  }

  sendMessage(conversationId: number, content: string) {
    return client.post('/chat/send', {
      conversationId,
      content,
    });
  }

  getAllMessages(page: number, perPage: number, id: number | undefined) {
    return client.get(
      `/chat/list-message?page=${page}&per_page=${perPage}&conversationId=${id}`,
    );
  }
}

export const apiRepository = new ApiRepository();
