import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {

  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setUser(prevState => {return { ...prevState, [e.target.name]: e.target.value }})
  }

  const sumbitHandler = (e) => {
    e.preventDefault()

    axios.post(`https://localhost:8000/api/register`, user, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data)
        navigate('/dashboard')
      })
      .catch((err) => {
        setErrors(err.response.data.error.errors)
      })
  }

  return (
    <div className="user-reg">
      <h1>Register for free</h1>
      <form onSubmit={sumbitHandler} method="POST" className="user-form">

        <label htmlFor="firstName">First name:</label>
        <input type="text" name="firstName" onChange={changeHandler} value={user.firstName} />
        {
          errors.firstName ?
            <span>{errors.firstName.message}</span>
            :null
        }

        <label htmlFor="lastName">Last name:</label>
        <input type="text" name="lastName" onChange={changeHandler} value={user.lastName} />
        {
          errors.lastName ?
            <span>{errors.lastName.message}</span>
            :null
        }

        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={changeHandler} value={user.email} />
        {
          errors.email ?
            <span>{errors.email.message}</span>
            : null
        }

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={changeHandler} value={user.password} />
        {
          errors.password ?
            <span>{errors.password.message}</span>
            :null
        }

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" onChange={changeHandler} value={user.confirmPassword} />
        {
          errors.confirmPassword ?
            <span>{errors.confirmPassword.message}</span>
            :null
        }

        <button>Register</button>
      </form>
      <Link to ={'/login'}>Already have an account?</Link>
    </div>
  );
}

export default Register;
