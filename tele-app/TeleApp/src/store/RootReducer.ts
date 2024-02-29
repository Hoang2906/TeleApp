import {combineReducers} from 'redux';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
});

export default rootReducer;
