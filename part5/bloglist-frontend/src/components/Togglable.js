import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  Togglable.displayName = 'Togglable';

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} id={props.buttonLabel}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

export default Togglable;
