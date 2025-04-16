import React, {useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUser, faEnvelope, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handelRegister = async (e) => {
        e.preventDefault()
        setLoading(true)

        const userData = {
            username,
            email,
            password
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
            console.log(response.data)
            setErrors({})
            setSuccess(true)
        } catch (error) {
            setErrors(error.response.data)
            console.error('Error registering user:', error)
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
                                    Create an Account
                                </h3>
                                <form onSubmit={handelRegister} className="d-flex flex-column align-items-center">
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
                                        {errors.username && (
                                            <small className="text-danger">{errors.username}</small>
                                        )}
                                    </div>
                                    
                                    <div className="mb-3 w-100">
                                        <div className="input-group">
                                            <span className="input-group-text bg-secondary text-light border-0">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </span>
                                            <input 
                                                type="email" 
                                                className="form-control bg-light"
                                                placeholder="Email" 
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        {errors.email && (
                                            <small className="text-danger">{errors.email}</small>
                                        )}
                                    </div>
                                    
                                    <div className="mb-4 w-100">
                                        <div className="input-group">
                                            <span className="input-group-text bg-secondary text-light border-0">
                                                <FontAwesomeIcon icon={faLock} />
                                            </span>
                                            <input 
                                                type="password" 
                                                className="form-control bg-light"
                                                placeholder="Set Password" 
                                                value={password} 
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        {errors.password && (
                                            <small className="text-danger">{errors.password}</small>
                                        )}
                                    </div>
                                    
                                    {success && (
                                        <div className="alert alert-success w-100">
                                            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                                            Registration successful! You can now login.
                                        </div>
                                    )}
                                    
                                    <div className="d-grid w-100">
                                        {loading ? (
                                            <button className="btn btn-info" disabled> 
                                                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                                                Processing...
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-info"> 
                                                Register 
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="mt-3 text-center">
                                        <p>Already have an account? <Link to="/login" className="text-info">Login here</Link></p>
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

export default Register