import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'initial notification',
  reducers: {
    showNotification(_state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export default notificationSlice.reducer;
