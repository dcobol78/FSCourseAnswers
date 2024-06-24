import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification.message.length === 0) {
    return null;
  }
  const type = notification.type === 'error' ? 'danger' : 'success';
  return (
    <div>
      <Alert variant={type}>{notification.message}</Alert>
    </div>
  );
};

export default Notification;
