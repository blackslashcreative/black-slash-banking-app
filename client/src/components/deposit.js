import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context';
import Card from './card';
import axios from 'axios';

function Deposit(){
  // App Context
  const context = useContext(AppContext);
  const { currentUser } = context;

  // form state
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // load user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [reload, setReload]   = useState(false);
  useEffect((userData) => {
    if (currentUser) {
      // Get user data
      console.log(`need to get uid... ${currentUser}`);
      const uid = currentUser.uid;
      axios.get(`/api/account/${uid}`)
        .then(function (response) {
          // handle success
          setUserData(response.data);
          console.log(`Fetch userData: ${JSON.stringify(userData)}`);
          setLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
          setReload(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser, reload]);

  function handleDeposit(e) {
    e.preventDefault();
    setErrorMessage('');
    if (!amount) {
      setErrorMessage('Deposit amount is required.');
      return
    }
    // Make the deposit
    const uid = currentUser.uid;
    axios.get(`/api/account/deposit/${userData.balance}/${amount}/${uid}`)
      .then(function (response) {
        // handle success
        setUserData(response.data);
        console.log(`Deposit data: ${JSON.stringify(response.data)}`);
        setReload(true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  
  const DepositForm = () => {
    return(
      <>
        <form>
          <input type="number" 
            className="form-control" 
            placeholder="Amount" 
            value={amount} 
            onChange={e => setAmount(e.currentTarget.value)}/><br/>

          <button type="submit" 
            className="btn btn-light" 
            onClick={handleDeposit}>Deposit</button>

          {errorMessage && (
            <div className="alert error">
              {errorMessage}
            </div>
          )}
        </form>
        {userData && (
          <>
            <h5>Balance: ${userData.balance}</h5>
          </>
        )}
      </>
    )
  }

  return (
    <main id="deposit" className="container">
      <h1>Deposit</h1>
      {loading &&
        <p>loading...</p>
      }
      {currentUser ? (
        <>
          <Card
          header=""
          body={<DepositForm/>}
          />
          <div className="status">Logged in as {currentUser.email}</div>
        </>
      ) : (
        <>Please log in.</>
      )}
    </main>
  )
};

export default Deposit;