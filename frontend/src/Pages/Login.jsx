import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const urlCadaster = 'http://localhost:3000/users';
const urlLogin = 'http://localhost:3000/login';

export default function Login () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [validateLogin, setValidateLogin] = useState(true);
  const [validateCadaster, setValidateCadaster] = useState(true);
  const history = useNavigate();

  const makeOptions = (method, body) => {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        setPassword(value);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const options = makeOptions('POST', { email, password });
    const data = await fetch(urlLogin, options).then((response) => response.json());
    setToken(data);
    setEmail('');
    setPassword('');
    if (data.token) return history('/');
    setValidateLogin(false);
    setTimeout(() => {
      setValidateLogin(true);
    }, 2000);
  }

  const cadaster = async (e) => {
    e.preventDefault();
    const options = makeOptions('POST', { name, email, password });
    const data = await fetch(urlCadaster, options).then((response) => response.json());
    setToken(data);
    setEmail('');
    setPassword('');
    setName('');
    if (data.token) history('/');
    setValidateCadaster(false);
    setTimeout(() => {
      setValidateCadaster(true);
    }, 2000);
    console.log(data);
  }

  return (
    <div className='login-cadaster'>

      <div className='first-login'>
        <h2>Fazer Login</h2>
        <form className='form-login' onSubmit={ (e) => login(e) }>
          <input value={ email } name='email' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Email' type='email' />
          <input value={ password } name='password' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Password' type='password' />
          <input className='button-login' type='submit' />
          { !validateLogin && <p style={ { color: '#ff0000' } }>Email ou senha incorretos.</p> }
        </form>
      </div>

      <div className='second-cadaster'>
        <h2>Ou Cadastre-se!</h2>
        <form className='form-cadaster' onSubmit={ (e) => cadaster(e) }>
          <input value={ name } name='name' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Name' type='text' />
          <input value={ email } name='email' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Email' type='email' />
          <input value={ password } name='password' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Password' type='password' />
          <input className='button-login' type='submit' />
          { !validateCadaster && <p style={ { color: '#ff0000' } }>Preencha todos os campos corretamente.</p> }
        </form>
      </div>

    </div>
  );
}
