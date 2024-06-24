import React, { useEffect } from 'react';
import blogService from './services/blogs';
import commentsService from './services/comments';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import NavBar from './components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from './reducers/blogReducer';
import { setLoginUser } from './reducers/userReducer';
import { getAllComments } from './reducers/commentsReducer';
import { getUsers } from './reducers/usersReducer';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  const user = useSelector((state) => state.user);
  const loginFormRef = React.createRef();
  const blogFormRef = React.createRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(setLoginUser(user));
      blogService.setToken(user.token);
      commentsService.setToken(user.token);
    }
  }, []);

  const createBlog = () => {
    return (
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <CreateBlogForm blogFormRef={blogFormRef} />
      </Togglable>
    );
  };

  return (
    <div className="container">
      <NavBar loginFormRef={loginFormRef} />
      <h2>blogs</h2>
      <Switch>
        <Route path="/users/:id/">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/blogs">
          {user !== null ? createBlog() : null}
          <Blogs />
        </Route>
        <Route path="/">
          {user !== null ? createBlog() : null}
          <Notification />
          <Blogs />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
