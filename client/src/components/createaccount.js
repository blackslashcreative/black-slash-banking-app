import { useState, useContext, useEffect } from 'react';
import Card from './card';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AppContext } from '../context';

function CreateAccount() {
  return(
    <main className="container">
      <Card
      bgcolor="light"
      header="Register"
      body={<CreateAccountForm/>}
      />
    </main>
  );
}

function CreateAccountForm() {

  const context = useContext(AppContext);
  //console.log(`context: ${JSON.stringify(context)}`);
  const { currentUser, setCurrentUser, firebaseapp } = context;
  const auth = getAuth(firebaseapp);
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    {currentUser &&
      setSuccessMessage(`Logged in as ${currentUser.uid}`);
    }
  }, [currentUser]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    //const userExists = 
    //console.log(FirstName,LastName,email,password);
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setCurrentUser(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Auth Error: ${errorCode} + ${errorMessage}`);
      });
    /*axios.get(`/api/account/create/${firstName}/${lastName}/${email}/${password}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });*/
      //.then((data) => setData(data.message));
    //props.setShow(false);
  }

  return (
    <>
    {successMessage ? (
      <div className="alert success">{successMessage}</div>
    ) : (
      <form>
        <input type="input" 
          className="form-control" 
          placeholder="First Name" 
          value={firstName} 
          onChange={e => setFirstName(e.currentTarget.value)} /><br/>

        <input type="input" 
          className="form-control" 
          placeholder="Last Name" 
          value={lastName} 
          onChange={e => setLastName(e.currentTarget.value)} /><br/>

        <input type="input" 
          className="form-control" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}/><br/>

        <input type="password" 
          className="form-control" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)}/><br/>

        <button type="submit" 
          className="btn btn-light" 
          onClick={handleFormSubmit}>Create Account</button>

        {errorMessage && (
          <div className="alert error">
            {errorMessage}
          </div>
        )}
      </form>
    )}
    </>
  );  
}

export default CreateAccount;