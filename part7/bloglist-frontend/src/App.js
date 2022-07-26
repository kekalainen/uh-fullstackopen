import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './slices/blog';
import { Routes, Route } from 'react-router-dom';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import User from './components/User';
import Users from './components/Users';
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);

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
      <Navbar />
      <h1>blogs</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/blogs/:id" element={<Blog />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<User />}></Route>
      </Routes>
    </div>
  );
};

export default App;
