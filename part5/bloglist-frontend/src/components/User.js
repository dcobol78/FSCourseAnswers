import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const User = () => {
  const userMatch = useRouteMatch('/users/:id');
  const users = useSelector((state) => state.users);
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;
  if (!user) {
    return null;
  }
  console.log('user', user);
  return (
    <div>
      <h2>{user.username}</h2>
      <b>added blogs</b>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
