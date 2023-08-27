import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AppContext } from '../context';
import { getAuth, signOut } from "firebase/auth";

function NavBar(){
  // App Context
  const context = useContext(AppContext);
  const { currentUser, setCurrentUser } = context;

  const logMeOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      setCurrentUser(null);
    }).catch((error) => {
      // An error happened.
    });
  }

  return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register/">Register</Nav.Link>
            {currentUser ? (
              <Nav.Link onClick={logMeOut} to="/logout/">Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login/">Login</Nav.Link>
            )}
            <Nav.Link as={Link} to="/deposit/">Deposit</Nav.Link>
            <Nav.Link as={Link} to="/withdraw/">Withdraw</Nav.Link>
            <Nav.Link as={Link} to="/balance/">Balance</Nav.Link>
            <Nav.Link as={Link} to="/data/">AllData</Nav.Link>
            {currentUser && <a className="nav-link flex-right">{currentUser.email}</a>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;