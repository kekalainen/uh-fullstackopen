import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blog';
import notificationReducer from './slices/notification';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
