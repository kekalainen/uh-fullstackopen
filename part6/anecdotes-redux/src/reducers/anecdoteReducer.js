import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, { payload: anecdote }) {
      state.push(anecdote);
    },
    voteAnecdote(state, { payload: id }) {
      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    },
    setAnecdotes(_state, { payload }) {
      return payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
