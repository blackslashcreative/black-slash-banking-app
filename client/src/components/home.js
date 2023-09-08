import { useContext } from 'react';
import { AppContext } from '../context';
import Card from './card';
import { Link } from "react-router-dom";
import formatCurrency from '../utils/formatCurrency';

function Home() {
  // App Context
  const context = useContext(AppContext);
  const { currentUser } = context;

  const UserDashboard = () => {
    return (
      <>
        {currentUser && (
          <>
            <p>Hi, {currentUser.firstname}!</p>
            <h5>Balance: {formatCurrency(currentUser.balance)}</h5>
          </>
        )}
      </>
    )
  }

  return(
    <main id="dashboard">
      <div className="container">
        <h1>Black Slash Bank</h1>
        <img className="banner" src="img/banner.jpg" alt="Screenshot of Bank App"/>
        {currentUser ? (
          <>
            <Card
            header="Account Dashboard"
            body={<UserDashboard/>}
            />
          </>
        ) : (
          <>
          <p>Welcome to Black Slash Bank! Please <Link to="/login">log in</Link>.</p>
          </>
        )
        }
      </div>
    </main>
  )

}

export default Home;