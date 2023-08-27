import { useContext } from 'react';
import { AppContext } from '../context';

function Home() {
  // App Context
  const context = useContext(AppContext);
  const { currentUser } = context;
  console.log(`currentUser = ${JSON.stringify(currentUser)}`);

  return(
    <main className="container">
      <h1>Home</h1>
      {currentUser && <div className="status">Logged in as {currentUser.email}</div>}
    </main>
  )
}

export default Home;