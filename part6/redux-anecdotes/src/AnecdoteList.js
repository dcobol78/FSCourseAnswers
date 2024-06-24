import React from 'react';
import { connect } from 'react-redux';
import { likeAnecdote } from './reducers/anecdoteReducer';
import { setNotify } from './reducers/notificationReducer';
const AnecdoteList = (props) => {
  const voteHandler = (id, name) => {
    props.likeAnecdote(id);
    props.setNotify(`you voted ${name}`, 5);
  };

  return (
    <div>
      {props.anecdotes
        .filter((ane) => ane.content.includes(props.filter))
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => voteHandler(anecdote.id, anecdote.content)}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  likeAnecdote,
  setNotify,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdotes;
