import { Container, Nav, Navbar } from 'react-bootstrap';

function NavBar(){
  return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/register/">Register</Nav.Link>
            <Nav.Link href="/login/">Login</Nav.Link>
            <Nav.Link href="/deposit/">Deposit</Nav.Link>
            <Nav.Link href="/withdraw/">Withdraw</Nav.Link>
            <Nav.Link href="/balance/">Balance</Nav.Link>
            <Nav.Link href="/data/">AllData</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;