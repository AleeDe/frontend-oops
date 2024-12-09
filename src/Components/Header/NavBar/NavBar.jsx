import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ isAuthenticated, handleLogout }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        handleLogout();
        navigate('/');
    };

    return (
        <div>
            <nav>
                <div className="wrapper">
                    <div className="logo"><Link to="/home">Logo</Link></div>
                    <input type="radio" name="slider" id="menu-btn" />
                    <input type="radio" name="slider" id="close-btn" />
                    <ul className="nav-links">
                        <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/resources">Resources</Link></li>
                        <li><Link to="/post">Jobs</Link></li>
                        <li><Link to="#">Projects</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                        
                    </ul>
                    <div className="logout">
                            <h2>{localStorage.getItem('username')}</h2>
                            <li><button className="btn-logout" onClick={handleLogoutClick}>Logout</button></li>
                            
                        </div>
                    <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
                </div>
            </nav>
            
        </div>
    );
}
