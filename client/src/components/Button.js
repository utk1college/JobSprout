import React from 'react';
import './Button.css'; // Optional for styling

function Button({ label, onClick, type = 'button', className = '', disabled = false }) {
  return (
    <button
      className={`btn ${className}`}  // Allow for custom classes (e.g., 'btn-large', 'btn-secondary')
      onClick={onClick}
      type={type}  // Allow button type to be dynamic
      disabled={disabled}  // Disable button when required
      aria-label={label}  // For accessibility
    >
      {label}
    </button>
  );
}

export default Button;
