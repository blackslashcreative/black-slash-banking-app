import { useContext } from 'react';
//import Card from './card';
import { AppContext } from '../context';

function LoginForm(){
  
  const context = useContext(AppContext);
  console.log(`context: ${JSON.stringify(context)}`);
  const { currentUser, setCurrentUser } = context;

  return(
    <main className="container">
      <h1>Login</h1>
    </main>
  )
};

export default LoginForm;