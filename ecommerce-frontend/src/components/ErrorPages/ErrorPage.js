import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className='error-page-body'>   
        <div className="error-container">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you're looking for can't be found.</p>
        <a href="/" className="error-link">Go back to Homepage</a>
        </div>
    </div>
  );
};

export default ErrorPage;
