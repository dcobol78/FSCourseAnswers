import React, { useState, useEffect } from 'react';
import { LOGIN } from '../queries';
import { useMutation } from '@apollo/client';
const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('libUser', token);
      setPage('authors');
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    await login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:{' '}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Login!</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
