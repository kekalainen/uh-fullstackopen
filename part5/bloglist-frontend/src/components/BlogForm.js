import { useState } from 'react';
import blogService from '../services/blogs';
import FormInput from './FormInput';

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await blogService.create({ title, author, url });
      onCreate();
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {}
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
