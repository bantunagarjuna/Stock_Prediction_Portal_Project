import React, {useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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

        console.log(userData)

    try{
        const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
        console.log(response.data)
        setErrors({})
        setSuccess(true)
    }
    catch (error) {
        setErrors(error.response.data)
        console.error('Error registering user:', error)
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
                                    <h3 className="text-light text-center">Create an Account</h3>
                                    <form onSubmit={handelRegister} className="d-flex flex-column align-items-center">
                                        <div className="mb-3 w-100">
                                            <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                                            <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
                                        </div>
                                        <div className="mb-3 w-100">
                                            <input type="email" className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                            <small>{errors.email && <div className="text-danger">{errors.email}</div>}</small>
                                        </div>
                                        <div className="mb-5 w-100">
                                            <input type="password" className='form-control' placeholder='Set Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                            <small>{errors.password && <div className="text-danger">{errors.password}</div>}</small>
                                        </div>
                                        {success && <div className="alert alert-success">Registration successful!</div>}
                                        {loading ? (<button className='btn btn-info' disabled> <FontAwesomeIcon icon={faSpinner} spin />Loading...</button>) :
                                            (<button type='submit' className='btn btn-info'> Register </button>)
                                            }
                                    </form>
                            </div>
                    </div>
            </div>
    </>
)
}


export default Register
