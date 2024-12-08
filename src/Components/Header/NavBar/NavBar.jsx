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
                        <li><Link to="/aboutus">About</Link></li>
                        <li>
                            <a href="/" className="desktop-item">Dropdown Menu</a>
                            <input type="checkbox" id="showDrop" />
                            <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                            <ul className="drop-menu">
                                <li><Link to="/">Drop menu 1</Link></li>
                                <li><Link to="/">Drop menu 2</Link></li>
                                <li><Link to="/">Drop menu 3</Link></li>
                                <li><Link to="/">Drop menu 4</Link></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/" className="desktop-item">Mega Menu</a>
                            <input type="checkbox" id="showMega" />
                            <label htmlFor="showMega" className="mobile-item">Mega Menu</label>
                            <div className="mega-box">
                                <div className="content">
                                    <div className="row">
                                        <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt="" />
                                    </div>
                                    <div className="row">
                                        <header>Design Services</header>
                                        <ul className="mega-links">
                                            <li><Link to="/">Graphics</Link></li>
                                            <li><Link to="/">Vectors</Link></li>
                                            <li><Link to="/">Business cards</Link></li>
                                            <li><Link to="/">Custom logo</Link></li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <header>Email Services</header>
                                        <ul className="mega-links">
                                            <li><Link to="/">Personal Email</Link></li>
                                            <li><Link to="/">Business Email</Link></li>
                                            <li><Link to="/">Mobile Email</Link></li>
                                            <li><Link to="/">Web Marketing</Link></li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <header>Security Services</header>
                                        <ul className="mega-links">
                                            <li><Link to="/">Site Seal</Link></li>
                                            <li><Link to="/">VPS Hosting</Link></li>
                                            <li><Link to="/">Privacy Seal</Link></li>
                                            <li><Link to="/">Website design</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li><Link to="#">Feedback</Link></li>
                        
                    </ul>
                    <div className="logout">
                            <h2>{localStorage.getItem('username')}</h2>
                            <li><button className="edit" onClick={handleLogoutClick}>Logout</button></li>
                            
                        </div>
                    <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
                </div>
            </nav>
            
        </div>
    );
}
