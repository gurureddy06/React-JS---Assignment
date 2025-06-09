import React from 'react';

function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/dashboard">Go to Dashboard</a>
        </div>
    );
}

export default NotFoundPage;