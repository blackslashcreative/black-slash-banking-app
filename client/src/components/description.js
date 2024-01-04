import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import axios from 'axios';
import Card from './card'; // Assuming you have a Card component
import formatCurrency from '../utils/formatCurrency';
import { Link } from "react-router-dom";

function AccountDetails() {
  const { currentUser } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      }
    }

    fetchData();
  }, [currentUser]);

  const formattedUpdatedAt = userData && new Date(userData.updatedAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  const formattedCreatedAt = userData && new Date(userData.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });

  return (
    <main id="account-details" className="container">
      {loading ? (
        <p>Loading...</p>
      ) : currentUser ? (
        <Card
          header="Account Description"
          body={
            <div>
              <p>Hi! {currentUser.firstname} {currentUser.lastname}</p>
              <p>Email: {currentUser.email}</p>
              {userData && (
                <div>
                  <p>Account Balance: {formatCurrency(userData.balance)}</p>
                  <p>CreatedAt: {formattedCreatedAt}</p>
                  <p>updatedAt: {formattedUpdatedAt}</p>

                  
                </div>
              )}
            </div>
          }
        />
      ) : (
        <p>Please log in...<Link to="/login">log in</Link></p>
      )}
    </main>
  );
}

export default AccountDetails;
