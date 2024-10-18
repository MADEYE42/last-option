'use client'
import { useEffect, useState } from 'react';

const ToastNotification = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    }
  }, [message]);

  return visible ? (
    <div className="fixed top-0 left-0 w-full p-4 bg-red-900 text-white text-center">
      {message}
    </div>
  ) : null;
};

export default ToastNotification;
