import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    contract: false,
    entry: false,
    mid: false,
    senior: false
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filters whenever jobs or filters change
  useEffect(() => {
    filterJobs();
  }, [jobs, filters, searchTerm, location]);

  // Add this to check if filters are working
  useEffect(() => {
    console.log('Current filters:', filters);
    console.log('Current jobs:', jobs);
    console.log('Filtered jobs:', filteredJobs);
  }, [filters, jobs, filteredJobs]);

  const fetchJobs = async () => {
    try {
      console.log('Fetching jobs...');
      const response = await axios.get('http://localhost:5001/api/jobs');
      console.log('Response:', response);
      console.log('Jobs data:', response.data);
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error details:', error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Job type filters
    if (filters.fullTime || filters.partTime || filters.contract) {
      filtered = filtered.filter(job => {
        if (filters.fullTime && job.type === 'full-time') return true;
        if (filters.partTime && job.type === 'part-time') return true;
        if (filters.contract && job.type === 'contract') return true;
        return false;
      });
    }

    // Experience level filters
    if (filters.entry || filters.mid || filters.senior) {
      filtered = filtered.filter(job => {
        if (filters.entry && job.experienceLevel === 'entry') return true;
        if (filters.mid && job.experienceLevel === 'mid') return true;
        if (filters.senior && job.experienceLevel === 'senior') return true;
        return false;
      });
    }

    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId) => {
    if (!user) {
      alert('Please login to apply for jobs');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5001/api/jobs/${jobId}/apply`,
        {},
        {
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.message) {
        alert(response.data.message);
        // Update UI to show application was successful
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job._id === jobId 
              ? { ...job, hasApplied: true }
              : job
          )
        );
        setFilteredJobs(prevJobs => 
          prevJobs.map(job => 
            job._id === jobId 
              ? { ...job, hasApplied: true }
              : job
          )
        );
      }
    } catch (error) {
      console.error('Application error:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to submit application');
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = [...jobs];

    // Search by title, company, or location
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by location
    if (location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  // Add this to update results as user types
  useEffect(() => {
    if (searchTerm || location) {
      handleSearch({ preventDefault: () => {} });
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, location, jobs]);

  const handleSaveJob = async (jobId) => {
    if (!user) {
      alert('Please login to save jobs');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5001/api/jobs/${jobId}/save`,
        {},
        {
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message) {
        alert(response.data.message);
        // Update UI to show job has been saved
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job._id === jobId 
              ? { ...job, isSaved: true }
              : job
          )
        );
        setFilteredJobs(prevJobs => 
          prevJobs.map(job => 
            job._id === jobId 
              ? { ...job, isSaved: true }
              : job
          )
        );
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert(error.response?.data?.message || 'Failed to save job');
    }
  };

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>
      <div className="jobs-search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="search-button">Search Jobs</button>
        </form>
      </div>
      <div className="jobs-content">
        <div className="filters-sidebar">
          <h3>Filters</h3>
          <div className="filter-section">
            <h4>Job Type</h4>
            <label>
              <input
                type="checkbox"
                checked={filters.fullTime}
                onChange={() => handleFilterChange('fullTime')}
              /> Full-time
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.partTime}
                onChange={() => handleFilterChange('partTime')}
              /> Part-time
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.contract}
                onChange={() => handleFilterChange('contract')}
              /> Contract
            </label>
          </div>
          <div className="filter-section">
            <h4>Experience Level</h4>
            <label>
              <input
                type="checkbox"
                checked={filters.entry}
                onChange={() => handleFilterChange('entry')}
              /> Entry Level
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.mid}
                onChange={() => handleFilterChange('mid')}
              /> Mid Level
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.senior}
                onChange={() => handleFilterChange('senior')}
              /> Senior Level
            </label>
          </div>
        </div>
        <div className="jobs-list">
          {loading ? (
            <p>Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <p>No jobs found matching your criteria</p>
          ) : (
            filteredJobs.map(job => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
                <p className="salary">{job.salary}</p>
                <p className="job-type">{job.type}</p>
                <p className="experience-level">Experience: {job.experienceLevel}</p>
                <div className="job-actions">
                  <button 
                    onClick={() => handleApply(job._id)}
                    className={`apply-button ${job.hasApplied ? 'applied' : ''}`}
                    disabled={job.hasApplied}
                  >
                    {job.hasApplied ? 'Applied' : 'Apply Now'}
                  </button>
                  <button 
                    onClick={() => handleSaveJob(job._id)}
                    className="save-button"
                  >
                    Save Job
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;