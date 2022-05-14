import { Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')));
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');
  const [notificationIndex, setNotificationIndex] = useState(0);
  const blogFormToggalble = useRef();

  const getBlogs = () => blogService.getAll().then((blogs) => setBlogs(blogs));

  const showNotification = (message, error = false) => {
    setNotificationMessage(message);
    setNotificationType(!error ? 'success' : 'error');
    setNotificationIndex(notificationIndex + 1);
  };

  const handleCreateBlog = async (payload) => {
    const blog = await blogService.create(payload);
    blogFormToggalble.current.toggleVisibility();
    setBlogs(blogs.concat(blog));
  };

  const handleLogout = () => {
    setUser(null);
    showNotification('logged out');
  };

  useEffect(() => {
    getBlogs();
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

  const notification = (
    <Notification
      message={notificationMessage}
      type={notificationType}
      index={notificationIndex}
    />
  );

  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        {notification}
        <LoginForm setUser={setUser} showNotification={showNotification} />
      </div>
    );
  }

  return (
    <div>
      <h1>blogs</h1>
      {notification}
      <p>
        hello, {user.name} 👋
        <button onClick={handleLogout}>log out</button>
      </p>
      <h2>create</h2>
      <Togglable buttonLabel="new blog" ref={blogFormToggalble}>
        <BlogForm
          onCreate={handleCreateBlog}
          showNotification={showNotification}
        />
      </Togglable>
      <h2>browse</h2>
      {blogs.map((blog, index, { length }) => (
        <Fragment key={blog.id}>
          <Blog blog={blog} />
          {index !== length - 1 && <hr />}
        </Fragment>
      ))}
    </div>
  );
};

export default App;
