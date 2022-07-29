import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../slices/blog';
import { showTimedNotification } from '../slices/notification';
import BlogComments from './BlogComments';

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a target="_blank" rel="noreferrer" href={blog.url}>
        {blog.url}
      </a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      {blog.user.username === auth.username && (
        <button onClick={handleDelete}>delete</button>
      )}
      <BlogComments />
    </div>
  );
};

export default Blog;
