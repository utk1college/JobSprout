import React from 'react';
import { FaBookReader, FaFileAlt, FaVideo, FaTools } from 'react-icons/fa';
import './CareerAdvice.css';

const CareerAdvice = () => {
  const resources = [
    {
      title: "Resume Writing Guide",
      description: "Learn how to create a professional resume that stands out",
      icon: FaFileAlt,
      link: "https://www.indeed.com/career-advice/resumes-cover-letters",
      category: "Resume Tips"
    },
    {
      title: "Interview Preparation",
      description: "Master common interview questions and techniques",
      icon: FaVideo,
      link: "https://www.linkedin.com/learning/topics/interview-preparation",
      category: "Interview Prep"
    },
    {
      title: "Career Development",
      description: "Resources for advancing your tech career",
      icon: FaBookReader,
      link: "https://www.coursera.org/browse/business/career-development",
      category: "Growth"
    },
    {
      title: "Technical Skills",
      description: "Free resources to improve your coding skills",
      icon: FaTools,
      link: "https://www.freecodecamp.org/learn",
      category: "Skills"
    }
  ];

  return (
    <div className="career-advice-page">
      <div className="advice-header">
        <h1>Career Resources</h1>
        <p>Curated resources to help you succeed in your tech career</p>
      </div>

      <div className="resources-grid">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card" onClick={() => window.open(resource.link, '_blank')}>
            <div className="resource-icon">
              <resource.icon />
            </div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <span className="category-tag">{resource.category}</span>
          </div>
        ))}
      </div>

      <div className="learning-paths">
        <h2>Recommended Learning Paths</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>Frontend Development</h3>
            <ul>
              <li>HTML & CSS Fundamentals</li>
              <li>JavaScript Mastery</li>
              <li>React Development</li>
            </ul>
            <a href="https://roadmap.sh/frontend" target="_blank" rel="noopener noreferrer">View Path →</a>
          </div>
          <div className="path-card">
            <h3>Backend Development</h3>
            <ul>
              <li>Node.js Fundamentals</li>
              <li>Database Design</li>
              <li>API Development</li>
            </ul>
            <a href="https://roadmap.sh/backend" target="_blank" rel="noopener noreferrer">View Path →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAdvice;