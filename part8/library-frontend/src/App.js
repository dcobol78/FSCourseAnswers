import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import Signup from './components/Signup';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, USER } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const client = useApolloClient();
  const [user, result] = useMutation(USER, {
    onError: (error) => {
      console.log('error.message.', error.graphQLErrors[0].message);
    },
  });
  useEffect(() => {
    if (localStorage.getItem('libUser')) {
      setToken(localStorage.getItem('libUser'));
    }
  }, []);

  useEffect(() => {
    if (token) {
    }
  });

  const logOutUser = () => {
    setToken(null);
    localStorage.removeItem('libUser');
    setPage('authors');
    client.resetStore();
  };

  const loggedIn = () => {
    return (
      <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logOutUser()}>Logout</button>
      </>
    );
  };

  const loggedOut = () => {
    return (
      <>
        <button onClick={() => setPage('signup')}>Sign up</button>
        <button onClick={() => setPage('login')}>Login</button>
      </>
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? loggedIn() : loggedOut()}
      </div>

      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />

      <Signup show={page === 'signup'} setPage={setPage} setToken={setToken} />

      <Login show={page === 'login'} setPage={setPage} setToken={setToken} />

      <Recommend show={page === 'recommend'} />
    </div>
  );
};

export default App;
