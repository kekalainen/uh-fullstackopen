import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/auth';
import { showTimedNotification } from '../slices/notification';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showTimedNotification('logged out'));
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
      <div>
        hello, {auth.name} 👋
        <button onClick={handleLogout}>log out</button>
      </div>
    </div>
  );
};

export default Navbar;
