import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import User from './Pages/User'
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route index element={ <Home /> } />
      <Route path='/users' element= { <User /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='*' element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
