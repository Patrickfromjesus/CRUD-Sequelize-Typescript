import { Link } from 'react-router-dom';
import './Header.css';

function Header () {
  return (
    <header className='header-page'>
      <Link className='link' to='/'><span className='span-header'>Home</span></Link>
      <Link className='link' to='/users'><span className='span-header'>Users</span></Link>
      <Link className='link' to='/login'><span className='span-header'>Logoff</span></Link>
    </header>
  );
}

export default Header;
