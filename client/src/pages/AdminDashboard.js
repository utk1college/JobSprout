import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    recentApplications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/admin/dashboard', {
        headers: { 'x-auth-token': token }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5001/api/admin/applications/${applicationId}`,
        { status: newStatus },
        {
          headers: { 'x-auth-token': token }
        }
      );
      
      fetchDashboardStats();
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Jobs</h3>
          <p>{stats?.totalJobs || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{stats?.totalApplications || 0}</p>
        </div>
      </div>

      <div className="recent-applications">
        <h2>Recent Applications</h2>
        {stats?.recentApplications?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentApplications
                .filter(app => app?.job && app?.user) // Filter out null jobs and users
                .map(app => (
                  <tr key={app._id}>
                    <td>{app.user?.username || 'Unknown User'}</td>
                    <td>{app.job?.title || 'Unknown Job'}</td>
                    <td>{app.status}</td>
                    <td>
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="interview">Interview</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No recent applications found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;