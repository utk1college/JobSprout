import React from 'react';
import './NotFound.css'; // Importing styling for NotFound

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="go-home">Go to Home</a>
    </div>
  );
}

export default NotFound;
