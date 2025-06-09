import React from 'react';

function Footer() {
    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} CRM App. All rights reserved.</p>
        </footer>
    );
}

const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    position: 'relative', // Can be fixed at bottom, but relative is usually safer
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box', // Include padding in width
    marginTop: 'auto', // Pushes footer to the bottom if content is short
};

export default Footer;