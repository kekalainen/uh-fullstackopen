import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/anecdoteFilterReducer';

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const style = {
    marginBottom: 10,
    marginTop: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
