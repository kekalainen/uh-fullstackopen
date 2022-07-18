import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from './FormInput';
import { showTimedNotification } from '../slices/notification';

const BlogForm = ({ onCreate }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      onCreate({ title, author, url });
      setTitle('');
      setAuthor('');
      setUrl('');
      dispatch(showTimedNotification(`added blog "${title}" by "${author}"`));
    } catch (exception) {
      dispatch(showTimedNotification(exception, true));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <FormInput
        label="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <FormInput
        label="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
