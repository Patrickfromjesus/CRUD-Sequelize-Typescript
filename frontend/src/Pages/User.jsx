import { useState, useEffect } from 'react';
import '../Styles/User.css';
import Header from '../Components/Header';
import makeOptions from '../hooks/makeOptions';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:3000/users';

export default function User({ id }) {
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      const data = await fetch(url).then((response) => response.json());
      return setUsers(data);
    };
    doFetch();
  }, [users])
  
  const handleDelete = async () => {
    const options = makeOptions('DELETE');
    fetch(`${url}/${Number(id)}`, options);
    history('/');
  };

  return (
    <div>
      <Header />
      <h1 className='title-users'>Usuários cadastrados</h1>
      {
        users.map((e) => (<div className='div-users' key={ e.id }>
          {
            id === e.id && <span className='delete-users' onClick={ (e) => handleDelete(e) }>x</span>
          }
          <p>Email: { e.email }</p>
          <p>Name: { e.name }</p>
          <p>Password: { e.password }</p>
        </div>))
      }
    </div>
  );
}
