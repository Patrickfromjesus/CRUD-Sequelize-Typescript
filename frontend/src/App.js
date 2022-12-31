import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import User from './Pages/User'
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState('');

  return (
    <Routes>
      <Route index element={ <Home /> } />
      <Route path='/users' element= { <User id={ token.id } /> } />
      <Route path='/login' element={ <Login setToken={ setToken } /> } />
      <Route path='*' element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
