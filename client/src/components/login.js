import { useContext, useState } from 'react';
import Card from './card';
import { AppContext } from '../context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
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
  const { currentUser, setCurrentUser } = context;
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Redirect after login 
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
  
    if (!email || !password) {
      setErrorMessage('Oops! Please double-check your login info.');
      return;
    }
  
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const uid = userCredential.user.uid;
  
        // Fetch user data from the API
        axios.get(`http://localhost:3001/api/account/${uid}`)
          .then(function (response) {
            // Handle success
            const userData = response.data;
            setCurrentUser(userData);
            navigate('/');
          })
          .catch(function (error) {
            // Handle API request error
            console.error(error);
            setErrorMessage('Failed to fetch user data.');
          });
      })
      .catch((error) => {
        // Handle Firebase authentication error
        console.error(error);
        setErrorMessage('Oops! Please double-check your login info.');
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