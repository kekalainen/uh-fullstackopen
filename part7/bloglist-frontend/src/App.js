import { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { showTimedNotification } from './slices/notification';
import { createBlog, initializeBlogs } from './slices/blog';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')));
  const blogFormToggalble = useRef();

  const handleCreateBlog = (payload) => {
    blogFormToggalble.current.toggleVisibility();
    dispatch(createBlog(payload, user));
  };

  const handleLogout = () => {
    setUser(null);
    dispatch(showTimedNotification('logged out'));
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('auth', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      localStorage.removeItem('auth');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        <Notification />
        <LoginForm setUser={setUser} />
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
