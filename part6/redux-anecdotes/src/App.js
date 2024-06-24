import React from "react";
import { useEffect } from "react";
import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdotes";
import { initAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <Notification />
      <AnecdoteList />
    </div>
  );
};

export default App;
