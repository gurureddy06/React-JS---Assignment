import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Header() {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header style={headerStyle}>
            <div style={logoStyle}>
                <Link to="/dashboard" style={logoLinkStyle}>CRM App</Link>
            </div>
            <nav>
                <ul style={navListStyle}>
                    {isLoggedIn && (
                        <>
                            <li><Link to="/dashboard" style={navLinkStyle}>Dashboard</Link></li>
                            <li><Link to="/products" style={navLinkStyle}>Products</Link></li>
                            <li style={userInfoStyle}>Welcome, {user?.firstName || 'User'}!</li>
                            <li>
                                <button onClick={handleLogout} style={logoutButtonStyle}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                    {!isLoggedIn && (
                        <li><Link to="/" style={navLinkStyle}>Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
};

const logoLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
};

const navListStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
};

const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
};

// Add hover effect for nav links
navLinkStyle[':hover'] = {
    backgroundColor: '#555',
};

const userInfoStyle = {
    marginRight: '20px',
    color: '#eee',
    fontSize: '14px',
};

const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
};

logoutButtonStyle[':hover'] = {
    backgroundColor: '#c82333',
};


export default Header;