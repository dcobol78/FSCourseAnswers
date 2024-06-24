import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const likeAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.likeAnec(id);
    dispatch({
      type: "LIKE",
      data: { id },
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: newNote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE":
      const oriObj = state.find((ane) => ane.id === action.data.id);
      const likedObj = {
        ...oriObj,
        votes: oriObj.votes + 1,
      };
      return state.map((ane) => (ane.id === action.data.id ? likedObj : ane));
    case "CREATE_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
