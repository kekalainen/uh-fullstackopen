import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showTimedNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const anecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(anecdote));
    showTimedNotification(dispatch, `created anecdote "${content}"`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input required name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
