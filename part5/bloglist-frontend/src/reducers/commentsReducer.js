/* eslint-disable indent */
import commentsService from '../services/comments';

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.data];
    case 'GET_ALL_COMMENTS':
      return action.data;
    default:
      return state;
  }
};

export const createComment = (comment) => {
  return async (dispatch) => {
    const newComment = await commentsService.create(comment);
    dispatch({
      type: 'ADD_COMMENT',
      data: newComment,
    });
  };
};

export const getAllComments = () => {
  return async (dispatch) => {
    const comments = await commentsService.getAll();
    dispatch({
      type: 'GET_ALL_COMMENTS',
      data: comments,
    });
  };
};

export default commentsReducer;
