import React, { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.css';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    window.location.href = '/';
  };

  return (
    <Fragment>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Link to={'/'}>
            <Navbar.Brand>React-Firebase</Navbar.Brand>
          </Link>
          <Nav className='justify-content-end '>
            {currentUser ? (
              <Nav.Link onClick={signOutHandler}>Sign-out</Nav.Link>
            ) : (
              <Nav.Link href='/auth'>Sign-in</Nav.Link>
            )}
            <Nav.Link href=''>{currentUser && currentUser.email}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
