import { useContext } from 'react';
import { AppContext } from '../context';
import axios from 'axios';
import Card from './card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Home() {
  // Wake up server
  const wakeServer = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/test`);
      console.log(`Pinged server... ${res.data}`);
    } catch (error) {
      console.log(error);
    }
  };
  wakeServer();
  
  // App Context
  const context = useContext(AppContext);
  const { currentUser } = context;

  const UserDashboard = () => {
    return (
      <>
        {currentUser && (
          <>
            <p>Hi, {currentUser.firstname}{currentUser.lastname}!</p>
            <p>Paradise Awaits in Every Transaction</p>
          </>
        )}
      </>
    )
  }

  return(
    <>
    <main id="dashboard">
      <Container>
        <Row>
          <Col md={8}>
            <h1>Boss Bank</h1>
            <img className="banner" src="img/banner.jpg" alt="Screenshot of Bank App"/>
          </Col>
          <Col>
            {currentUser ? (
              <>
                <Card
                header="Wellcome"
                body={<UserDashboard/>}
                />
              </>
            ) : (
              <>
              <p>Welcome to Boss Bank! Please <Link to="/login">log in</Link>.</p>
              <hr className="gradient-divider" />
              </>
            )
            }
          </Col>
        </Row>
      </Container>
    </main>
    <div className="gradient-footer"></div>
    </>
  )

}

export default Home;