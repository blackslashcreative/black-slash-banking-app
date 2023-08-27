import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavBar(){
  return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register/">Register</Nav.Link>
            <Nav.Link as={Link} to="/login/">Login</Nav.Link>
            <Nav.Link as={Link} to="/deposit/">Deposit</Nav.Link>
            <Nav.Link as={Link} to="/withdraw/">Withdraw</Nav.Link>
            <Nav.Link as={Link} to="/balance/">Balance</Nav.Link>
            <Nav.Link as={Link} to="/data/">AllData</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;