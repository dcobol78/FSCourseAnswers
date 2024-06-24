/* eslint-disable no-case-declarations */
/* eslint-disable indent */
const notificationReducer = (state = { type: '', message: '' }, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      const newState = {
        type: action.data.type,
        message: action.data.message,
      };
      return newState;
    case 'HIDE_MESSAGE':
      return { type: '', message: '' };
    default:
      return state;
  }
};

export const setNotify = (type, message) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        type: type,
        message: message,
      },
    });
  };
};

export const hideNotify = () => {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_MESSAGE',
    });
  };
};

export default notificationReducer;
