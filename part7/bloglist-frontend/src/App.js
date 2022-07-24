import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { logout } from './slices/auth';
import { showTimedNotification } from './slices/notification';
import { initializeBlogs } from './slices/blog';
import { Routes, Route } from 'react-router-dom';
import Blogs from './components/Blogs';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);

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
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
      </Routes>
    </div>
  );
};

export default App;
