import React from 'react';

const CompanyLogo = ({ company }) => {
  // Function to generate initials from company name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="company-logo">
      {getInitials(company)}
    </div>
  );
};

export default CompanyLogo; 