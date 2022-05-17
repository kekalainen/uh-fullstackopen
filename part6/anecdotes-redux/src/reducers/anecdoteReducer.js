import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, { payload: anecdote }) {
      state.push(anecdote);
    },
    voteAnecdote(state, { payload: id }) {
      const votes = state.find((anecdote) => anecdote.id === id).votes + 1;
      anecdoteService.setVotes(id, votes);

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : { ...anecdote, votes }
      );
    },
    setAnecdotes(_state, { payload }) {
      return payload;
    },
  },
});

export const initializeAnecdotes = () => async (dispatch) =>
  dispatch(setAnecdotes(await anecdoteService.getAll()));

export const createAnecdote = (content) => async (dispatch) =>
  dispatch(appendAnecdote(await anecdoteService.create(content)));

export const { appendAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
