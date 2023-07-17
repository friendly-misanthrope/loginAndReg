import {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setUserLogin(prevState => { return { ...prevState, [e.target.name]: e.target.value } })
  }

  const sumbitHandler = (e) => {
    e.preventDefault()

    axios.post(`http://localhost:8000/api/login`, userLogin, {
      withCredentials: true
    })
      .then((res) => {
        // console.log(res.data)
        navigate('/dashboard')
      })
      .catch((err) => {
        setErrors(err.response.data)
      })
  }
  return (
    <div className='user-login'>
      <h1>Login</h1>
      <form onSubmit={sumbitHandler}>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={changeHandler} value={userLogin.email}/>

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={changeHandler} value={userLogin.password} />
        {
          errors ?
            <span>{errors.message}</span>
            :null
        }

        <button>Login</button>
      </form>

    </div>
  );
}

export default Login;
