import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { Nav, Navbar as NB } from 'react-bootstrap';

const NavBar = ({ loginFormRef }) => {
  const padding = {
    padding: 5,
  };

  return (
    <div>
      <NB bg="dark" variant="dark">
        <NB.Brand href="#">
          <Link to="/" style={padding}>
            Homepage
          </Link>
        </NB.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#">
            <Link to="/blogs/" style={padding}>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#">
            <Link to="/users/" style={padding}>
              Users
            </Link>
          </Nav.Link>
          <Login loginFormRef={loginFormRef} />
        </Nav>
      </NB>
    </div>
  );
};

export default NavBar;
