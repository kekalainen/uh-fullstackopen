import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog, likeBlog } from '../slices/blog';
import { showTimedNotification } from '../slices/notification';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(showTimedNotification(`liked blog "${blog.title}"`));
  };

  const handleDelete = () => {
    if (!window.confirm(`delete blog "${blog.title}"?`)) return;

    dispatch(deleteBlog(blog));
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
