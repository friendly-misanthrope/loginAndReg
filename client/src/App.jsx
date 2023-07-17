import './App.css';
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './components/register';

function App() {

  const [user, setUser] = useState({})

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register user={user} setUser={setUser} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
