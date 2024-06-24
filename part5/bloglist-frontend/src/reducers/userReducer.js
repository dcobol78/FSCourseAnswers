/* eslint-disable indent */
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotify, hideNotify } from '../reducers/notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export const setLoginUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      dispatch({
        type: 'SET_USER',
        data: user,
      });
    } catch (e) {
      dispatch(setNotify('error', 'Wrong username or password'));
      setTimeout(() => {
        dispatch(hideNotify());
      }, 5000);
    }
  };
};

export default userReducer;
