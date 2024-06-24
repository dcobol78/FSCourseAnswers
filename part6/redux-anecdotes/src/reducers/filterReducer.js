const filterReducer = (state = "", action) => {
  if (action.type === "SET_FILTER") {
    return action.filter;
  } else {
    return state;
  }
};

export const filterAnecdotes = (option) => {
  return {
    type: "SET_FILTER",
    filter: option,
  };
};

export default filterReducer;
