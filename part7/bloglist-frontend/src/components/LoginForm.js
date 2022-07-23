import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/auth';
import { showTimedNotification } from '../slices/notification';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(login({ username, password })).unwrap();
      setUsername('');
      dispatch(showTimedNotification(`logged in as ${user.name}`));
    } catch ({ message }) {
      dispatch(showTimedNotification(message, true));
    }

    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        username
        <input
          name="username"
          type="text"
          required
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label>
        password
        <input
          name="password"
          type="password"
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <button type="submit">log in</button>
    </form>
  );
};

export default LoginForm;
