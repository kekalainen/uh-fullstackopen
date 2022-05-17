import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.anecdote.value));
    event.target.anecdote.value = '';
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
