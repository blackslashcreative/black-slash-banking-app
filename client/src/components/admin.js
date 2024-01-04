import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import formatCurrency from '../utils/formatCurrency';

function Admin() {
  const { currentUser } = useContext(AppContext);
  const [bankData, setBankData] = useState({});
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/alldata');
      setBankData(response.data);
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/account/delete/${userId}`);
        // After successful deletion, fetch updated data
        fetchData();
      } catch (error) {
        console.error("Error deleting user:", error);
        setError('Error deleting user: ' + error.message);
      }
    }
  };
  

  if (currentUser && currentUser.role === 'admin') {
    return (
      <Container className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Balance</th>
              <th>CreatedAt</th>
              <th>updatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(bankData).map((user) => {
              const formattedCreatedAt =
                user && new Date(user.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
                const formattedUpdatedAt = 
                user && new Date(user.updatedAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });


              return (
                <tr key={user._id}>
                  <td className="fw-bold">{user.firstname} {user.lastname}</td>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{formatCurrency(user.balance)}</td>
                  <td>{formattedCreatedAt || 'N/A'}</td>
                  <td>{formattedUpdatedAt || 'N/A'}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {error && <div className="alert error">{error}</div>}
      </Container>
    );
  } else {
    return <>You do not have permission to access this page.</>;
  }
}

export default Admin;
