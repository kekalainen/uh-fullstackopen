import { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')));

  const getBlogs = () => blogService.getAll().then((blogs) => setBlogs(blogs));

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

  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        <LoginForm setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <h1>blogs</h1>
      <p>
        hello, {user.name} 👋
        <button onClick={() => setUser(null)}>log out</button>
      </p>
      <h2>create</h2>
      <BlogForm onCreate={getBlogs} />
      <h2>browse</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
