import React, { useEffect, useState } from 'react';
import Listing from '../../components/listing/listing.component';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        setUsers(users);
      });
  }, []);

  return (
    <div className='App'>
      <Listing users={users} />
    </div>
  );
};

export default Home;
