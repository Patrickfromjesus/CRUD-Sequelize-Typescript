import { useState, useEffect } from 'react';
import Header from '../Components/Header';

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const url = 'http://localhost:3000/users';
      const data = await fetch(url).then((response) => response.json());
      return setUsers(data); 
    };
    doFetch();
  }, [users])
  

  return (
    <div>
      <Header />
      {
        users.map((e) => (<div key={ e.id }>
          <p>{ e.email }</p>
          <p>{ e.name }</p>
          <p>{ e.password }</p>
        </div>))
      }
    </div>
  );
}
