import './App.css';
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './components/register';
import Dashboard from './components/dashboard';
import Login from './components/login';

function App() {

  const [user, setUser] = useState({})

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register user={user} setUser={setUser} />}></Route>
        <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser} />}></Route>
        <Route path='/login' element={<Login user={user} setUser={setUser} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
