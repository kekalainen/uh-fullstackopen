import { useState, useEffect, useRef } from 'react';

const Notification = ({ message, type, index }) => {
  const [visible, setVisible] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (message !== null) {
      clearTimeout(timeoutId.current);
      setVisible(true);
      timeoutId.current = setTimeout(() => setVisible(false), 5000);
    }

    return () => clearTimeout(timeoutId.current);
  }, [message, index]);

  if (!visible) return null;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
