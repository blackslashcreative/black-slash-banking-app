import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context';
import Card from './card';
import axios from 'axios';
import { Link } from "react-router-dom";
import formatCurrency from '../utils/formatCurrency';

function Home() {
  // App Context
  const context = useContext(AppContext);
  const { currentUser } = context;

  // load user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(true);
  useEffect((userData) => {
    if (currentUser) {
      // Get user data
      console.log(`need to get uid... ${currentUser}`);
      const uid = currentUser.uid;
      axios.get(`/api/account/${uid}`)
        .then(function (response) {
          // handle success
          setUserData(response.data);
          console.log(`Homepage userData: ${JSON.stringify(userData)}`);
          setLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const UserDashboard = () => {
    return (
      <>
        {userData && (
          <>
            <p>Hi, {userData.firstname}!</p>
            <h5>Balance: {formatCurrency(userData.balance)}</h5>
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
        {loading &&
          <p>loading...</p>
        }
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