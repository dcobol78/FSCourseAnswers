import React from 'react';
import { loginUser } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ loginFormRef }) => {
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      loginUser(event.target.username.value, event.target.password.value)
    );
    loginFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" id="username" />
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" name="password" id="password" />
          <Button type="submit" id="submit-login-button">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
