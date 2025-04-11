import React, {useState, useContext} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'


const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const { isLoggedIn , setIsLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const userData = {
            username,
            password
        }

        console.log(userData)

        try{
          const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
          localStorage.setItem('access', response.data.access)
          localStorage.setItem('refresh', response.data.refresh)
          console.log("Login successful")
          setIsLoggedIn(true)
          navigate('/')
      }
      catch (error) {
          console.error('Error Login user:', error)
          setErrors("Invalid username or password")
      }
      finally {
          setLoading(false)
      }
  }

  return (
    <>
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 bg-light-dark p-5 rounded"> 
              <h3 className="text-light text-center">Login to your Account</h3>
              <form onSubmit={handleLogin} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-100">
                    <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3 w-100">
                    <input type="password" className='form-control' placeholder='Set Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {errors && <div className="text-danger">{errors}</div>}
                {loading ? (<button className='btn btn-info' disabled> <FontAwesomeIcon icon={faSpinner} spin />Logging in...</button>) :
                    (<button type='submit' className='btn btn-info'> Login </button>)
                    }
              </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default Login
