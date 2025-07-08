import React from 'react';
import './Footer.css';  // Ensure the footer is styled properly

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 JobSprout. All rights reserved.</p>
      <div className="social-icons">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>  {/* Ensure you have FontAwesome included */}
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        {/* Add more social links here as needed */}
      </div>
    </footer>
  );
};

export default Footer;
