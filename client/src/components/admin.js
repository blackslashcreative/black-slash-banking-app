import { useContext, useState } from 'react';
import { AppContext } from '../context';
import axios from 'axios';
import formatCurrency from '../utils/formatCurrency';

function Admin(){
  // App Context
  const { currentUser } = useContext(AppContext);
  const [ bankData, setBankData ] = useState({});

  axios.get(`${process.env.REACT_APP_API_URL}/api/alldata`)
    .then(function (response) {
      setBankData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  if (currentUser.role === "admin") {
    return (
      <main id="admin" className="container">
        <h1>Bank Data</h1>
        {bankData && (
          <ul>print bank data items</ul>
        )}
      </main>
    );
  } else {
    return <>You do not have permission to access this page.</>
  }
};

export default Admin;