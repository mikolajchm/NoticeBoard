import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
    return (
        <Navbar bg="dark" expand="lg" className="mt-2 mb-4 rounded" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>NoticeBoard</Navbar.Brand>
             <Nav className="me-auto, justify-content-center">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>
                <Nav.Link as={NavLink} to="/logout">Sign out</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    );
};

export default NavBar;