import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Companies.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Group jobs by company
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/jobs');
        const jobs = response.data;
        
        // Group jobs by company and count positions
        const companyMap = jobs.reduce((acc, job) => {
          if (!acc[job.company]) {
            acc[job.company] = {
              name: job.company,
              industry: getIndustryFromJob(job),
              location: job.location,
              openPositions: 1,
              jobs: [job]
            };
          } else {
            acc[job.company].openPositions += 1;
            acc[job.company].jobs.push(job);
          }
          return acc;
        }, {});

        setCompanies(Object.values(companyMap));
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const getIndustryFromJob = (job) => {
    // Logic to determine industry based on job title/description
    if (job.title.toLowerCase().includes('tech') || 
        job.title.toLowerCase().includes('developer') ||
        job.title.toLowerCase().includes('engineer')) {
      return 'Technology';
    }
    if (job.title.toLowerCase().includes('design')) return 'Design';
    if (job.title.toLowerCase().includes('data')) return 'Data Science';
    return 'Technology'; // Default industry
  };

  const handleViewJobs = (company) => {
    navigate(`/jobs?company=${company.name}`);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="companies-page">
      <h1>Top Companies Hiring</h1>
      <div className="companies-search">
        <input 
          type="text" 
          placeholder="Search companies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option value="">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Design">Design</option>
          <option value="Data Science">Data Science</option>
        </select>
      </div>
      <div className="companies-grid">
        {filteredCompanies.map((company, index) => (
          <div key={index} className="company-card">
            <div className="company-logo">
              {company.name.charAt(0)}
            </div>
            <h3>{company.name}</h3>
            <p className="industry">{company.industry}</p>
            <p className="location">{company.location}</p>
            <p className="positions">{company.openPositions} Open Positions</p>
            <button 
              className="view-jobs-btn"
              onClick={() => handleViewJobs(company)}
            >
              View Jobs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;