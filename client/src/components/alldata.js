import { useState, useEffect } from 'react'

function AllData() {
  const [data, setData] = useState('');

  useEffect(() => {
    // fetch all accounts from express api
    fetch ('/account/all')
      .then (response => response.json())
      .then (data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  return (
    <>
    <h1>All Data</h1>
    {data}
    </>
  );
}

export default AllData;