import { useContext, useState } from 'react';
import Card from './card';
import { AppContext } from '../context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login(){
  return(
    <main className="container form">
      <Card
      header="Login"
      body={<LoginForm/>}
      />
    </main>
  );
};

function LoginForm() {
  // App Context
  const context = useContext(AppContext);
  console.log(`context: ${JSON.stringify(context)}`);
  const { currentUser, setCurrentUser } = context;
  console.log(`currentUser: ${JSON.stringify(currentUser)}`);
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Redirect after login 
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    //const userExists = 
    if (!email || !password) {
      setErrorMessage('Oops! Please double check your login info.');
      setSuccessMessage('');
      return
    }
    // Log in
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setCurrentUser(userCredential.user);
        setTimeout(() => {
          navigate('/')
        }, 2000);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage('Oops! Please double check your login info.')
      });
  }

  return (
    <>
      {currentUser ? <div className="alert success">Logged in as {currentUser.email}</div> : (
      <form>
        <input type="input" 
          className="form-control" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}/>

        <input type="password" 
          className="form-control" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)}/>

        <div className="input-group flex-end">
          <button type="submit" 
            className="btn btn-dark" 
            onClick={handleFormSubmit}>Login</button>
        </div>
        
        {errorMessage && (
          <div className="alert error">
            {errorMessage}
          </div>
        )}
      </form>
      )}
    </>
  )
}

export default Login;