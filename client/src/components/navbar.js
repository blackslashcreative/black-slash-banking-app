import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AppContext } from '../context';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo.svg';

function NavBar(){
  // App Context
  const context = useContext(AppContext);
  const { currentUser, setCurrentUser } = context;
  const navigate = useNavigate();

  const logMeOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      setCurrentUser(null);
      navigate('/');
    }).catch((error) => {
      // An error happened.
    });
  }

  return(
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={logo} alt="Bank Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {currentUser ? (
                <>
                  <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/deposit/">Deposit</Nav.Link>
                  <Nav.Link as={Link} to="/withdraw/">Withdraw</Nav.Link>
                  <Nav.Link as={Link} to="/description/">Description</Nav.Link>

                </>
              ) : (
                <>
                <Nav.Link as={Link} to="/login/">Login</Nav.Link>
                <Nav.Link as={Link} to="/register/">Register</Nav.Link>
                </>
              )}
              {currentUser && currentUser.role === "admin" && (
                <Nav.Link as={Link} to="/data/"className="text-danger">All Data</Nav.Link>
              )}
              {currentUser && (
                <>
                <Nav.Link className="flex-right" onClick={logMeOut} to="/logout/">Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {currentUser && <Container><div id="status-bar" className="flex-right"><small>Logged in as: {currentUser.email}</small></div></Container>}
      {currentUser && currentUser.role === "admin" && <Container><div id="admin-bar" className="flex-right"><small className="text-danger">ADMINISTRATOR</small></div></Container>}
    </>
  );
}

export default NavBar;