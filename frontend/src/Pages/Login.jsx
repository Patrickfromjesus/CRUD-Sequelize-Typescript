import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import makeOptions from '../hooks/makeOptions';
import { validateName, validateFields } from '../hooks/validateFields';
import '../Styles/Login.css';

const urlCadaster = 'http://localhost:3000/users';
const urlLogin = 'http://localhost:3000/login';

export default function Login ({ setToken }) {
  const [name, setName] = useState('');
  const [emailCadaster, setEmailCadaster] = useState('');
  const [passwordCadaster, setPasswordCadaster] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [validateLogin, setValidateLogin] = useState(true);
  const [validateCadaster, setValidateCadaster] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [cadasterDisabled, setCadasterDisabled] = useState(true);
  const history = useNavigate();

  const handleChange = ({ target }) => {
    const { value } = target;
    switch (target.name) {
      case 'name':
        setName(value);
        setCadasterDisabled(validateName(value, emailCadaster, passwordCadaster));
        break;
      case 'email-cadaster':
        setEmailCadaster(value);
        setCadasterDisabled(validateName(name, value, passwordCadaster));
        break;
      case 'password-cadaster':
        setPasswordCadaster(value);
        setCadasterDisabled(validateName(name, emailCadaster, value));
        break;
      case 'email':
        setEmailLogin(value);
        setLoginDisabled(validateFields(value, passwordLogin));
        break;
      default:
        setPasswordLogin(value);
        setLoginDisabled(validateFields(emailLogin, value));
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const options = makeOptions('POST', { email: emailLogin, password: passwordLogin });
    const data = await fetch(urlLogin, options).then((response) => response.json());
    setToken(data);
    setEmailLogin('');
    setPasswordLogin('');
    if (data.token) return history('/users');
    setValidateLogin(false);
    setTimeout(() => {
      setValidateLogin(true);
    }, 2500);
  }

  const cadaster = async (e) => {
    e.preventDefault();
    const options = makeOptions('POST', { name, email: emailCadaster, password: passwordCadaster });
    const data = await fetch(urlCadaster, options).then((response) => response.json());
    setToken(data);
    setEmailCadaster('');
    setPasswordCadaster('');
    setName('');
    if (data.token) history('/users');
    setValidateCadaster(false);
    setTimeout(() => {
      setValidateCadaster(true);
    }, 2500);
    console.log(data);
  }

  return (
    <div className='login-cadaster'>

      <div className='first-login'>
        <h2>Fazer Login</h2>
        <form className='form-login' onSubmit={ (e) => login(e) }>
          <input value={ emailLogin } name='email' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Email' type='email' />
          <input value={ passwordLogin } name='password' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Password' type='password' />
          <input disabled={ loginDisabled } className='button-login' type='submit' />
          { !validateLogin && <p style={ { color: '#ff0000' } }>Email ou senha incorretos.</p> }
        </form>
      </div>

      <div className='second-cadaster'>
        <h2>Ou Cadastre-se!</h2>
        <form className='form-cadaster' onSubmit={ (e) => cadaster(e) }>
          <input value={ name } name='name' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Name' type='text' />
          <input value={ emailCadaster } name='email-cadaster' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Email' type='email' />
          <input value={ passwordCadaster } name='password-cadaster' onChange={ (e) => handleChange(e) } className='input-login' placeholder='Password' type='password' />
          <input disabled={ cadasterDisabled } className='button-login' type='submit' />
          { !validateCadaster && <p style={ { color: '#ff0000' } }>Preencha todos os campos corretamente.</p> }
        </form>
      </div>

    </div>
  );
}
