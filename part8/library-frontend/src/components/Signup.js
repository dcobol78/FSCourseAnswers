import React, { useState, useEffect } from 'react';
import { SIGNUP, LOGIN } from '../queries';
import { useMutation } from '@apollo/client';

const Signup = ({ show, setPage, setToken }) => {
  const [username, setUsername] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [signup] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log(
        'error.graphQLErrors[0].message',
        error.graphQLErrors[0].message
      );
    },
  });
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

  const signupHandler = async (e) => {
    e.preventDefault();

    await signup({ variables: { username, favoriteGenre } });
    await login({ variables: { username, password: 'asd' } });
    setUsername('');
    setFavoriteGenre('');
  };

  return (
    <div>
      <form onSubmit={signupHandler}>
        <div>
          Username:{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Favorite Genre:{' '}
          <input
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <div>
          <button type="submit">Sign Up!</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
