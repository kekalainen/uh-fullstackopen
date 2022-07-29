import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from './FormInput';
import { createBlogComment } from '../slices/blog';
import { showTimedNotification } from '../slices/notification';

const BlogCommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(createBlogComment({ id, content }));
      dispatch(showTimedNotification(`posted comment "${content}"`));
      setContent('');
    } catch (exception) {
      dispatch(showTimedNotification(exception, true));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        required
        placeholder="enter a comment here"
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      <button type="submit">post</button>
    </form>
  );
};

export default BlogCommentForm;
