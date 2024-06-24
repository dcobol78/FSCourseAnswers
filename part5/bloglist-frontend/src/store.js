import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';
import commentsReducer from './reducers/commentsReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
  users: usersReducer,
  comments: commentsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
