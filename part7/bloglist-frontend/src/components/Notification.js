import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (notification === null) return null;
  const { type, message } = notification;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
