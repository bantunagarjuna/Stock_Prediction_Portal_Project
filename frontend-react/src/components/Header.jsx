import React, {useContext} from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const header = () => {
    const { isLoggedIn , setIsLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setIsLoggedIn(false)  
        navigate('/')
    }
  return (
    <>
      <nav className='navbar container pt-3 pb-3 align-items-start'>
        <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>
        <div>
          {isLoggedIn ? (
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        ):
          (
            <>
            < Button text="Login" class='btn-outline-light' url = "/login" />
            &nbsp;
            < Button text="Register" class='btn-info' url = "/register" />
            </>
          )  
          }
            
      </div>
      </nav>
    </>
  )
}

export default header
