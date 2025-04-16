import React, {useState, useContext} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const userData = {
            username,
            password
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            console.log("Login successful")
            setIsLoggedIn(true)
            navigate('/')
        } catch (error) {
            console.error('Error Login user:', error)
            setErrors("Invalid username or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5"> 
                        <div className="card bg-dark text-light shadow rounded-3 border-0">
                            <div className="card-body p-4">
                                <h3 className="text-center mb-4">
                                    <FontAwesomeIcon icon={faUser} className="me-2" />
                                    Login to Your Account
                                </h3>
                                <form onSubmit={handleLogin} className="d-flex flex-column align-items-center">
                                    <div className="mb-3 w-100">
                                        <div className="input-group">
                                            <span className="input-group-text bg-secondary text-light border-0">
                                                <FontAwesomeIcon icon={faUser} />
                                            </span>
                                            <input 
                                                type="text" 
                                                className="form-control bg-light"
                                                placeholder="Username" 
                                                value={username} 
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 w-100">
                                        <div className="input-group">
                                            <span className="input-group-text bg-secondary text-light border-0">
                                                <FontAwesomeIcon icon={faLock} />
                                            </span>
                                            <input 
                                                type="password" 
                                                className="form-control bg-light"
                                                placeholder="Password" 
                                                value={password} 
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    
                                    {errors && (
                                        <div className="alert alert-danger w-100 py-2">{errors}</div>
                                    )}
                                    
                                    <div className="d-grid w-100">
                                        {loading ? (
                                            <button className="btn btn-info" disabled> 
                                                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                                                Logging in...
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-info"> 
                                                Login 
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="mt-3 text-center">
                                        <p>Don't have an account? <Link to="/register" className="text-info">Register here</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login