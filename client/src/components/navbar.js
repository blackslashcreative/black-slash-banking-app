import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AppContext } from '../context';

function NavBar(){
  // App Context
  const context = useContext(AppContext);
  const { currentUser } = context;

  return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register/">Register</Nav.Link>
            <Nav.Link as={Link} to="/login/">Login</Nav.Link>
            <Nav.Link as={Link} to="/deposit/">Deposit</Nav.Link>
            <Nav.Link as={Link} to="/withdraw/">Withdraw</Nav.Link>
            <Nav.Link as={Link} to="/balance/">Balance</Nav.Link>
            <Nav.Link as={Link} to="/data/">AllData</Nav.Link>
            {currentUser && <a class="nav-link flex-right">{currentUser.email}</a>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;