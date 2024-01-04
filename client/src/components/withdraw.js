import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context';
import Card from './card';
import axios from 'axios';
import formatCurrency from '../utils/formatCurrency';

function Withdraw() {
  const { currentUser } = useContext(AppContext);
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const uid = currentUser._id;
        const response = await axios.get(`http://localhost:3001/api/account/${uid}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setReload(false);
      }
    }

    fetchData();
  }, [currentUser, reload]);
  async function handleWithdraw(e) {
    e.preventDefault();
    setErrorMessage('');
  
    if (!currentUser) {
      setErrorMessage('User is not logged in.');
      return;
    }
  
    if (!amount) {
      setErrorMessage('Withdrawal amount is required.');
      return;
    }
  
    const withdrawAmount = parseFloat(amount);
  
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setErrorMessage('Please enter a valid positive amount.');
      return;
    }
  
    try {
      const uid = currentUser._id;
      const response = await axios.get(`http://localhost:3001/api/account/${uid}`);
      const userData = response.data;
  
      if (withdrawAmount > userData.balance) {
        setErrorMessage('Insufficient Balance');
        return;
      }
  
      const withdrawResponse = await axios.get(
        `http://localhost:3001/api/account/withdraw/${userData.balance}/${withdrawAmount}/${uid}`
      );
  
      setUserData(withdrawResponse.data);
      setAmount('');
      if (!reload) {
        setReload(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while processing your withdrawal.');
    }
  }
  

  return (
    <main id="withdraw" className="container">
      {loading ? (
        <p>loading...</p>
      ) : currentUser ? (
        <Card
          header="Withdrawal"
          body={
            <form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">₹</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.currentTarget.value)}
                />
              </div>
              <div className="form-footer">
                {userData && <span>Balance: {formatCurrency(userData.balance)}</span>}
                <button type="submit" className="btn btn-dark" onClick={handleWithdraw}>
                  Withdraw
                </button>
              </div>
              {errorMessage && <div className="alert error">{errorMessage}</div>}
            </form>
          }
        />
      ) : (
        <>Please log in.</>
      )}
    </main>
  );
}

export default Withdraw;
