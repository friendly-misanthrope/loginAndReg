import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setUser(prevState => {return { ...prevState, [e.target.name]: e.target.value }})
  }

  const sumbitHandler = (e) => {
    e.preventDefault()

    axios.post(`http://localhost:8000/api/register`, user, {
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*'}
    })
      .then((res) => {
        console.log(res.data)
        // ! Don't forget to navigate back to dashboard
        // navigate('/')
      })
      .catch((err) => {
        // setErrors(err.response.data.error.errors)
        console.log(err)
      })
  }

  return (
    <div className="user-reg">
      <h1>Register for free</h1>
      <form onSubmit={sumbitHandler} method="POST" className="user-form">

        <label htmlFor="firstName">First name:</label>
        <input type="text" name="firstName" onChange={changeHandler} value={user.firstName} />

        <label htmlFor="lastName">Last name:</label>
        <input type="text" name="lastName" onChange={changeHandler} value={user.lastName} />

        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={changeHandler} value={user.email} />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={changeHandler} value={user.password} />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" onChange={changeHandler} value={user.confirmPassword} />

        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
