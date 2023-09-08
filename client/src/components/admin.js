import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import formatCurrency from '../utils/formatCurrency';

function Admin(){
  // App Context
  const { currentUser } = useContext(AppContext);
  const [ bankData, setBankData ] = useState({});

  // Get Bank Data
  useEffect(() => {
    const getData = () => {
      axios
      .get(`${process.env.REACT_APP_API_URL}/api/alldata`)
      .then(function (response) {
        setBankData(response.data);
      })
      .catch(error => console.log(error));
      };
    getData();
  }, []);

  if (currentUser.role === "admin") {
    return (
      <Container className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(bankData).map(user => {
                return (
                  <tr key={user._id}>
                    <td className="fw-bold">{user.firstname} {user.lastname}</td>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{formatCurrency(user.balance)}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return <>You do not have permission to access this page.</>
  }
};

export default Admin;