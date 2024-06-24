import React from 'react';
import { createAnecdote } from './reducers/anecdoteReducer.js';
import { connect } from 'react-redux';
import { setNotify } from './reducers/notificationReducer';

const AnecdotesForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const ane = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(ane);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotify,
};

const ConnectedAnecdotes = connect(null, mapDispatchToProps)(AnecdotesForm);

export default ConnectedAnecdotes;
