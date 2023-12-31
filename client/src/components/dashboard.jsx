import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Dashboard = (props) => {

  const navigate = useNavigate()

  const logout = () => {
    axios.post('https://localhost:8000/api/logout', {}, {withCredentials: true})
      .then((res) => {
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='user-dashboard'>
      <h1>Welcome to the dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
