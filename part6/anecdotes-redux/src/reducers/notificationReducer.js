import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(_state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

let timeoutId;
export const showTimedNotification = (dispatch, content, timeout = 5000) => {
  clearTimeout(timeoutId);
  dispatch(showNotification(content));
  timeoutId = setTimeout(() => dispatch(removeNotification()), timeout);
};

export const { showNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
