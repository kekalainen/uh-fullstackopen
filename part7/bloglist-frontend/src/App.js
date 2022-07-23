import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { logout } from './slices/auth';
import { showTimedNotification } from './slices/notification';
import { createBlog, initializeBlogs } from './slices/blog';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);
  const blogs = useSelector(({ blogs }) => blogs);
  const blogFormToggalble = useRef();

  const handleCreateBlog = (payload) => {
    blogFormToggalble.current.toggleVisibility();
    dispatch(createBlog(payload, user));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showTimedNotification('logged out'));
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <p>
        hello, {user.name} 👋
        <button onClick={handleLogout}>log out</button>
      </p>
      <h2>create</h2>
      <Togglable buttonLabel="new blog" ref={blogFormToggalble}>
        <BlogForm onCreate={handleCreateBlog} />
      </Togglable>
      <h2>browse</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog, index, { length }) => (
          <Fragment key={blog.id}>
            <Blog blog={blog} user={user} />
            {index !== length - 1 && <hr />}
          </Fragment>
        ))}
    </div>
  );
};

export default App;
