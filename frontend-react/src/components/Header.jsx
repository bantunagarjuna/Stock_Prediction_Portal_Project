import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChartLine, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthProvider'; // Adjust path as needed

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleDashboardClick = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const handleLogout = () => {
        // Use the centralized logout function from context
        logout();
        // Navigate to login page
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <FontAwesomeIcon icon={faChartLine} className="me-2 text-info" />
                    <span className="fw-bold">StockPredictor</span>
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item me-2">
                            <Link className="nav-link" to="/">
                                <FontAwesomeIcon icon={faHome} className="me-1" /> Home
                            </Link>
                        </li>
                        
                        {isLoggedIn && (
                            <li className="nav-item me-2">
                                <a 
                                    className="nav-link" 
                                    href="/dashboard" 
                                    onClick={handleDashboardClick}
                                >
                                    <FontAwesomeIcon icon={faChartLine} className="me-1" /> Dashboard
                                </a>
                            </li>
                        )}
                        
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button 
                                    className="btn btn-outline-danger btn-sm" 
                                    onClick={handleLogout}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Button 
                                        text="Login" 
                                        class="btn-outline-info btn-sm" 
                                        url="/login" 
                                    />
                                </li>
                                <li className="nav-item">
                                    <Button 
                                        text="Register" 
                                        class="btn-info btn-sm" 
                                        url="/register" 
                                    />
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;