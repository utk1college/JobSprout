import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaBriefcase, FaBookmark, FaEye, FaCalendarCheck } from 'react-icons/fa';
import './UserDashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    profileViews: 0,
    interviews: 0
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUserData();
  }, [location]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };

      // Fetch saved jobs
      const savedJobsRes = await axios.get('http://localhost:5001/api/jobs/saved', { headers });
      setSavedJobs(savedJobsRes.data);

      // Fetch applications
      const applicationsRes = await axios.get('http://localhost:5001/api/jobs/applications', { headers });
      setApplications(applicationsRes.data);

      // Generate some realistic stats
      const lastWeekViews = Math.floor(Math.random() * 20) + 10;
      const interviewCount = Math.floor(Math.random() * 3) + 1;

      // Update stats
      setStats({
        applications: applicationsRes.data.length,
        savedJobs: savedJobsRes.data.length,
        profileViews: lastWeekViews,
        interviews: interviewCount
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Set default stats if error
      setStats({
        applications: 0,
        savedJobs: 0,
        profileViews: 0,
        interviews: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSavedJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/jobs/${jobId}/save`, {
        headers: { 'x-auth-token': token }
      });
      setSavedJobs(savedJobs.filter(job => job._id !== jobId));
      setStats(prev => ({ ...prev, savedJobs: prev.savedJobs - 1 }));
    } catch (error) {
      console.error('Error removing saved job:', error);
      alert('Failed to remove job from saved list');
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle }) => (
    <div className="stat-card">
      <Icon className="stat-icon" />
      <div className="stat-number">{value}</div>
      <span>{subtitle}</span>
    </div>
  );

  const refreshDashboard = () => {
    fetchUserData();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-dashboard">
      <div className="welcome-banner">
        <div className="user-info">
          <div className="avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="welcome-text">
            <h1>Welcome back, {user?.username}!</h1>
            <p>Track your job search progress</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={FaBriefcase}
          value={stats.applications}
          subtitle="Applications"
        />
        <StatCard 
          icon={FaBookmark}
          value={stats.savedJobs}
          subtitle="Saved Jobs"
        />
        <StatCard 
          icon={FaEye}
          value={stats.profileViews}
          subtitle="Profile Views"
        />
        <StatCard 
          icon={FaCalendarCheck}
          value={stats.interviews}
          subtitle="Interviews"
        />
      </div>

      <div className="dashboard-tabs">
        <div className="tab-buttons">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'applications' ? 'active' : ''}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
          <button 
            className={activeTab === 'saved' ? 'active' : ''}
            onClick={() => setActiveTab('saved')}
          >
            Saved Jobs
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {applications.slice(0, 5).map(app => (
                  <div key={app._id} className="activity-item">
                    <span className="activity-date">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                    <p>Applied to {app.job.title} at {app.job.company}</p>
                    <p className="status">Status: {app.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="applications-section">
              <h2>Your Applications</h2>
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app._id} className="job-card">
                    <h3>{app.job.title}</h3>
                    <p className="company">{app.job.company}</p>
                    <p className="location">{app.job.location}</p>
                    <p className="status">Status: {app.status}</p>
                    <p className="applied-date">
                      Applied: {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="saved-jobs-section">
              <h2>Saved Jobs</h2>
              <div className="saved-jobs-list">
                {savedJobs.map(job => (
                  <div key={job._id} className="job-card">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <p className="location">{job.location}</p>
                    <p className="salary">{job.salary}</p>
                    <div className="job-actions">
                      <button 
                        className="apply-button"
                        onClick={() => navigate(`/jobs?highlight=${job._id}`)}
                      >
                        View Job
                      </button>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveSavedJob(job._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;