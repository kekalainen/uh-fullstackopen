import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import blogReducer from './slices/blog';
import notificationReducer from './slices/notification';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
