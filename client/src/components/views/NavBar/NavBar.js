import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getLoggedUser } from "../../../redux/userRedux";
import { useSelector } from "react-redux";


const NavBar = () => {
  const loggedUser = useSelector(getLoggedUser);
    return (
        <Navbar bg="dark" expand="lg" className="mt-2 mb-4 rounded" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>NoticeBoard</Navbar.Brand>
            <Nav className="me-auto" variant="underline">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            </Nav>
            <Nav className="ms-auto" variant="underline"> 
              { !loggedUser && (
                <>
                  <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
                  <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>
                </>
              )}
              { loggedUser && (
                <>
                <Nav.Link as={NavLink} to="/ad/add">Add Ad</Nav.Link>
                <Nav.Link as={NavLink} to="/logout">Sign out</Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
    );
};

export default NavBar;