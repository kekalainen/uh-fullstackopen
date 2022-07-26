import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../slices/blog';
import { showTimedNotification } from '../slices/notification';

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  if (!blog) return null;

  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(showTimedNotification(`liked blog "${blog.title}"`));
  };

  const handleDelete = async () => {
    if (!window.confirm(`delete blog "${blog.title}"?`)) return;

    await dispatch(deleteBlog(blog));
    dispatch(showTimedNotification(`deleted blog "${blog.title}"`));
    navigate('/');
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
          {blog.user.username === auth.username && (
            <button onClick={handleDelete}>delete</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
