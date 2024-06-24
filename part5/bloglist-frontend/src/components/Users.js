import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Users = () => {
  const users = useSelector((state) => state.users);
  console.log('users', users);
  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
