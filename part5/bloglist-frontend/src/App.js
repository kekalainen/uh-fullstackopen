import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')));

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(
    () =>
      user !== null
        ? localStorage.setItem('auth', JSON.stringify(user))
        : localStorage.removeItem('auth'),
    [user]
  );

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
      <h2>blogs</h2>
      <p>hello, {user.name} 👋</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
