import { useState, useContext } from 'react';
import { UserContext } from "../App";
import Card from './card';
import axios from 'axios';

function CreateAccount() {
  const ctx = useContext(UserContext);
  console.log(`ctx = ${JSON.stringify(ctx)}`);

  return(
    <Card
    bgcolor="light"
    header="Register"
    body={<CreateAccountForm/>}
    />
  );

}

function CreateAccountForm(props) {
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleFormSubmit() {
    setErrorMessage('');
    //const userExists = 
    //console.log(FirstName,LastName,email,password);
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return
    }
    axios.get(`/api/account/create/${firstName}/${lastName}/${email}/${password}`)
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
      });
      //.then((data) => setData(data.message));
    //props.setShow(false);
  }

  return (<>

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

  </>);

}

export default CreateAccount;