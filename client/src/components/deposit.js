import { useContext, useState } from 'react';
import { AppContext } from '../context';
import Card from './card';
import axios from 'axios';
import formatCurrency from '../utils/formatCurrency';

function Deposit(){
  // App Context
  const context = useContext(AppContext);
  const { currentUser, setCurrentUser } = context;

  // form state
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleDeposit(e) {
    e.preventDefault();
    setErrorMessage('');
    if (!amount) {
      setErrorMessage('Deposit amount is required.');
      return
    }
    // Make the deposit
    axios.get(`${process.env.REACT_APP_API_URL}/api/account/deposit/${currentUser.balance}/${amount}/${currentUser._id}`)
      .then(function (response) {
        // handle success = get updated user data
        axios.get(`${process.env.REACT_APP_API_URL}/api/account/${currentUser._id}`)
          .then(function (response) {
            setCurrentUser(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        // reset form 
        setAmount(0);
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
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">$</span>
            </div>
            <input type="number" 
              className="form-control" 
              placeholder="Amount" 
              value={amount} 
              onChange={e => setAmount(e.currentTarget.value)}/><br/>
          </div>
          <div className="form-footer">
            <span>Balance: {formatCurrency(currentUser.balance)}</span>
            <button type="submit" 
            className="btn btn-dark" 
            onClick={handleDeposit}>Deposit</button>
          </div>
          {errorMessage && (
            <div className="alert error">
              {errorMessage}
            </div>
          )}
        </form>
      </>
    )
  }

  return (
    <main id="deposit" className="container">
      <h1>Deposit</h1>
      {currentUser ? (
        <>
          <Card
          header=""
          body={<DepositForm/>}
          />
        </>
      ) : (
        <>Please log in.</>
      )}
    </main>
  )
};

export default Deposit;