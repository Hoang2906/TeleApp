import {useAppDispatch, useAppSelector} from '../store/store';
import {login, logout} from '../store/slices/authSlice';
import UserModel from '../networks/models/UserModel';
import client from '../networks/ApiClient';
import { useEffect } from "react";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth);

  function signOut() {
    dispatch(logout());
  }

  function signIn(user: UserModel) {
    dispatch(login(user));
  }

  const token = authData.user?.access_token;
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return {
    authData,
    signIn,
    signOut,
  };
}
