import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showTimedNotification } from '../slices/notification';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    // TOOD: reimplement.
    dispatch(showTimedNotification(`liked blog "${blog.title}"`));
  };

  const handleDelete = () => {
    if (!window.confirm(`delete blog "${blog.title}"?`)) return;

    // TOOD: reimplement.
    dispatch(showTimedNotification(`deleted blog "${blog.title}"`));
  };

  return (
    <div>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'collapse' : 'expand'}
        </button>
      </div>
      {expanded && (
        <>
          <a target="_blank" rel="noreferrer" href={blog.url}>
            {blog.url}
          </a>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && (
            <button onClick={handleDelete}>delete</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
