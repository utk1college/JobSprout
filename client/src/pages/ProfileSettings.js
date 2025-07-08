import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    bio: '',
    skills: '',
    experience: '',
    education: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: { 'x-auth-token': token }
        });
        
        setFormData({
          username: response.data.username || '',
          email: response.data.email || '',
          currentPassword: '',
          newPassword: '',
          bio: response.data.bio || '',
          skills: response.data.skills?.join(', ') || '',
          experience: response.data.experience || '',
          education: response.data.education || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Error loading profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const updateData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim())
      };

      const response = await axios.put(
        'http://localhost:5001/api/users/profile',
        updateData,
        {
          headers: { 'x-auth-token': token }
        }
      );

      setMessage('Profile updated successfully!');
      updateUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(error.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-settings">
      <h1>Profile Settings</h1>
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Change Password</h2>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Professional Information</h2>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label>Skills (comma-separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>
          
          <div className="form-group">
            <label>Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="4"
              placeholder="Brief description of your work experience"
            />
          </div>
          
          <div className="form-group">
            <label>Education</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows="4"
              placeholder="Your educational background"
            />
          </div>
        </div>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings; 