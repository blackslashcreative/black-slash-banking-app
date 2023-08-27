import { useContext } from 'react';
import { AppContext } from '../context';
import Card from './card';

function Home() {
  // App Context
  const context = useContext(AppContext);
  const { currentUser } = context;
  console.log(`currentUser = ${JSON.stringify(currentUser)}`);

  const UserDashboard = () => {
    return (
      <>
        testing
      </>
    )
  }

  return(
    <main id="dashboard" className="container">
      <h1>Home</h1>
      {currentUser && 
        <>
          <Card
          header="Your Account"
          body={<UserDashboard/>}
          />
          <div className="status">Logged in as {currentUser.email}</div>
        </>
      }
    </main>
  )

}

export default Home;