import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import './Dashboard.css';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import CompanyLogo from '../components/CompanyLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGoogle, 
  faMicrosoft, 
  faAmazon
} from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    jobsPosted: 25,
    activeUsers: 150,
    companiesHiring: 500
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  // Sample data for charts
  const jobTrendsData = [
    { month: 'Jan', jobs: 45000 },
    { month: 'Feb', jobs: 50000 },
    { month: 'Mar', jobs: 55000 },
    { month: 'Apr', jobs: 48000 },
    { month: 'May', jobs: 60000 },
    { month: 'Jun', jobs: 65000 }
  ];

  const skillsData = [
    { name: 'React', value: 72 },
    { name: 'Java', value: 68 },
    { name: 'Python', value: 65 },
    { name: 'Node.js', value: 58 },
    { name: 'AWS', value: 52 }
  ];

  const salaryData = [
    { range: '3-6 LPA', count: 250 },
    { range: '6-10 LPA', count: 380 },
    { range: '10-15 LPA', count: 420 },
    { range: '15-20 LPA', count: 280 },
    { range: '20+ LPA', count: 150 }
  ];

  const industryGrowthData = [
    { industry: 'Tech', growth: 28 },
    { industry: 'Healthcare', growth: 22 },
    { industry: 'Finance', growth: 18 },
    { industry: 'Retail', growth: 12 },
    { industry: 'Education', growth: 15 }
  ];

  const COMPANY_ICONS = {
    'Google': faGoogle,
    'Microsoft': faMicrosoft,
    'Amazon': faAmazon
  };

  const companies = [
    {
      name: 'Google',
      openings: 150,
      careerUrl: 'https://careers.google.com/jobs/results/'
    },
    {
      name: 'Microsoft',
      openings: 200,
      careerUrl: 'https://careers.microsoft.com/us/en/search-results'
    },
    {
      name: 'Amazon',
      openings: 300,
      careerUrl: 'https://www.amazon.jobs/en/'
    },
    {
      name: 'JP Morgan',
      openings: 180,
      careerUrl: 'https://careers.jpmorgan.com/IN/en/home'
    },
    {
      name: 'Accenture',
      openings: 400,
      careerUrl: 'https://careers.accenture.com/in/en'
    },
    {
      name: 'IBM',
      openings: 250,
      careerUrl: 'https://careers.ibm.com/job-search/'
    },
    {
      name: 'Goldman Sachs',
      openings: 120,
      careerUrl: 'https://www.goldmansachs.com/careers/'
    },
    {
      name: 'Adobe',
      openings: 90,
      careerUrl: 'https://www.adobe.com/careers.html'
    },
    {
      name: 'Cisco',
      openings: 160,
      careerUrl: 'https://jobs.cisco.com/'
    }
  ];

  useEffect(() => {
    axios.get('http://localhost:5001/api/test')
      .then(response => {
        const newStats = {
          jobsPosted: response.data.jobsPosted || 25,
          activeUsers: response.data.activeUsers || 150,
          companiesHiring: response.data.companiesHiring || 500
        };
        setStats(newStats);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/jobs');
    } else {
      navigate('/signup');
    }
  };

  const handleLearnMore = () => {
    document.querySelector('.features-section').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="dashboard-container">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="logo-job">Job</span><span className="logo-sprout">Sprout</span>
          </h1>
          <p className="hero-subtitle">Your journey towards your dream job begins here.</p>
          <div className="hero-cta">
            <Button 
              label="Get Started" 
              className="primary-btn"
              onClick={handleGetStarted}
            />
            <Button 
              label="Learn More" 
              className="secondary-btn"
              onClick={handleLearnMore}
            />
          </div>
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="top-companies">
        <h2 className="section-title">Top Companies Hiring</h2>
        <div className="companies-grid">
          {companies.map((company) => (
            <a 
              key={company.name}
              href={company.careerUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="company-card"
            >
              <div className="company-logo">
                {COMPANY_ICONS[company.name] ? (
                  <FontAwesomeIcon 
                    icon={COMPANY_ICONS[company.name]} 
                    size="2x" 
                    className="company-icon"
                  />
                ) : (
                  <div className="fallback-logo">
                    {getInitials(company.name)}
                  </div>
                )}
              </div>
              <h3>{company.name}</h3>
              <p>{company.openings}+ openings</p>
            </a>
          ))}
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="market-insights">
        <h2 className="section-title">Job Market Insights</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Job Posting Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="month" 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                  tickLine={{ stroke: '#fff' }}
                />
                <YAxis 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                  tickLine={{ stroke: '#fff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2c2c2c',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                  cursor={{ stroke: '#1DB954', strokeWidth: 2 }}
                />
                <Legend 
                  wrapperStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="jobs" 
                  stroke="#1DB954" 
                  strokeWidth={3}
                  dot={{ fill: '#1DB954', r: 6, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, fill: '#1ed760', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Most In-Demand Skills</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="name" 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <YAxis 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2c2c2c',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#1DB954"
                  radius={[4, 4, 0, 0]}
                  onMouseOver={(data) => {
                    // Add hover effect
                    return { fill: '#1ed760' };
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Salary Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="range" 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <YAxis 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2c2c2c',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#1DB954"
                  strokeWidth={3}
                  fill="#1DB954"
                  fillOpacity={0.3}
                  activeDot={{ r: 8, fill: '#1ed760', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Industry Growth Rate (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={industryGrowthData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#fff" tick={{ fill: '#fff' }} />
                <YAxis 
                  dataKey="industry" 
                  type="category" 
                  stroke="#fff" 
                  tick={{ fill: '#fff' }} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2c2c2c',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar 
                  dataKey="growth" 
                  fill="#1DB954"
                  radius={[0, 4, 4, 0]}
                >
                  {industryGrowthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#1DB954`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon">🔍</div>
            <h3>Intelligent Matching</h3>
            <p>Advanced AI algorithms to connect you with the perfect job opportunities.</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">📈</div>
            <h3>Career Analytics</h3>
            <p>Real-time market insights and salary data to guide your career decisions.</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🚀</div>
            <h3>Skill Development</h3>
            <p>Personalized learning paths to enhance your professional growth.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-box">
            <h4>{stats.jobsPosted}k+</h4>
            <p>Active Listings</p>
          </div>
          <div className="stats-box">
            <h4>{stats.activeUsers}k+</h4>
            <p>Professionals</p>
          </div>
          <div className="stats-box">
            <h4>{stats.companiesHiring}+</h4>
            <p>Partner Companies</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Start Your Career Journey Today</h2>
        <p>Join thousands of professionals discovering new opportunities every day</p>
        <Button 
          label={user ? "Browse Jobs" : "Get Started"} 
          className="primary-btn"
          onClick={handleGetStarted}
        />
      </section>
    </div>
  );
};

export default Dashboard;