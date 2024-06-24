import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: `${props.notification.info ? '' : 'none'}`,
  };

  return <div style={style}>{props.notification.info}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps, null)(Notification);

export default ConnectedNotification;
