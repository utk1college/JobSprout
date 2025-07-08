const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');
const Admin = require('../models/Admin');

// Add this test route at the top of your routes
router.get('/test', (req, res) => {
  res.json({ message: 'Jobs route is working' });
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all jobs...');
    const jobs = await Job.find().sort({ createdAt: -1 });
    console.log('Found jobs:', jobs);
    res.json(jobs);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for a job
router.post('/:jobId/apply', auth, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({ 
      job: jobId, 
      user: userId 
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = new Application({
      job: jobId,
      user: userId,
      status: 'pending',
      appliedAt: new Date()
    });

    await application.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save a job
router.post('/:jobId/save', auth, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already saved
    const existingSaved = await SavedJob.findOne({ 
      job: jobId, 
      user: userId 
    });

    if (existingSaved) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    const savedJob = new SavedJob({
      job: jobId,
      user: userId,
      savedAt: new Date()
    });

    await savedJob.save();
    res.json({ message: 'Job saved successfully' });
  } catch (error) {
    console.error('Error saving job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/jobs/seed (for testing purposes)
router.post('/seed', async (req, res) => {
  try {
    const sampleJobs = [
      {
        title: "Full Stack Developer",
        company: "Tech Corp",
        location: "New York, NY",
        salary: "$120,000 - $150,000",
        type: "full-time",
        experienceLevel: "mid",
        description: "Looking for a skilled full stack developer...",
        requirements: ["React", "Node.js", "MongoDB"]
      },
      {
        title: "Frontend Engineer",
        company: "StartUp Inc",
        location: "Remote",
        salary: "$90,000 - $120,000",
        type: "full-time",
        experienceLevel: "entry",
        description: "Join our growing team...",
        requirements: ["JavaScript", "React", "CSS"]
      },
      {
        title: "DevOps Engineer",
        company: "Cloud Solutions",
        location: "San Francisco, CA",
        salary: "$130,000 - $160,000",
        type: "contract",
        experienceLevel: "senior",
        description: "Seeking experienced DevOps engineer...",
        requirements: ["AWS", "Docker", "Kubernetes"]
      }
    ];

    await Job.insertMany(sampleJobs);
    res.json({ message: 'Sample jobs added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding jobs' });
  }
});

// Add this temporary route for easy seeding through browser
router.get('/seed-jobs', async (req, res) => {
  try {
    const sampleJobs = [
      {
        title: "Full Stack Developer",
        company: "Tech Corp",
        location: "New York, NY",
        salary: "$120,000 - $150,000",
        type: "full-time",
        experienceLevel: "mid",
        description: "Looking for a skilled full stack developer...",
        requirements: ["React", "Node.js", "MongoDB"]
      },
      {
        title: "Frontend Engineer",
        company: "StartUp Inc",
        location: "Remote",
        salary: "$90,000 - $120,000",
        type: "full-time",
        experienceLevel: "entry",
        description: "Join our growing team...",
        requirements: ["JavaScript", "React", "CSS"]
      },
      {
        title: "DevOps Engineer",
        company: "Cloud Solutions",
        location: "San Francisco, CA",
        salary: "$130,000 - $160,000",
        type: "contract",
        experienceLevel: "senior",
        description: "Seeking experienced DevOps engineer...",
        requirements: ["AWS", "Docker", "Kubernetes"]
      },
      {
        title: "UI/UX Designer",
        company: "Design Masters",
        location: "Los Angeles, CA",
        salary: "$95,000 - $120,000",
        type: "full-time",
        experienceLevel: "mid",
        description: "Join our creative team...",
        requirements: ["Figma", "Adobe XD", "UI/UX"]
      },
      {
        title: "Data Scientist",
        company: "Data Analytics Co",
        location: "Boston, MA",
        salary: "$140,000 - $180,000",
        type: "full-time",
        experienceLevel: "senior",
        description: "Looking for an experienced data scientist...",
        requirements: ["Python", "Machine Learning", "SQL"]
      },
      {
        title: "Mobile Developer",
        company: "App Innovators",
        location: "Seattle, WA",
        salary: "$110,000 - $140,000",
        type: "full-time",
        experienceLevel: "mid",
        description: "Build next-gen mobile applications...",
        requirements: ["React Native", "iOS", "Android"]
      },
      {
        title: "Backend Engineer",
        company: "ServerPro",
        location: "Austin, TX",
        salary: "$115,000 - $145,000",
        type: "full-time",
        experienceLevel: "mid",
        description: "Build scalable backend systems...",
        requirements: ["Java", "Spring Boot", "PostgreSQL"]
      },
      {
        title: "QA Engineer",
        company: "Quality First",
        location: "Chicago, IL",
        salary: "$85,000 - $110,000",
        type: "full-time",
        experienceLevel: "entry",
        description: "Ensure software quality...",
        requirements: ["Selenium", "TestNG", "Automation"]
      },
      {
        title: "Product Manager",
        company: "Product Labs",
        location: "Miami, FL",
        salary: "$130,000 - $160,000",
        type: "full-time",
        experienceLevel: "senior",
        description: "Lead product development...",
        requirements: ["Product Management", "Agile", "Leadership"]
      }
    ];

    // Add these jobs to your sampleJobs array in the seed-jobs route
    const indianJobs = [
      {
        title: "Software Engineer",
        company: "TCS",
        location: "Bangalore, India",
        salary: "₹12,00,000 - ₹18,00,000",
        type: "full-time",
        experienceLevel: "mid",
        description: "Join India's leading IT services company...",
        requirements: ["Java", "Spring Boot", "Microservices"]
      },
      {
        title: "Frontend Developer",
        company: "Infosys",
        location: "Hyderabad, India",
        salary: "₹8,00,000 - ₹14,00,000",
        type: "full-time",
        experienceLevel: "entry",
        description: "Looking for talented frontend developers...",
        requirements: ["React", "JavaScript", "HTML/CSS"]
      },
      {
        title: "Data Engineer",
        company: "Wipro",
        location: "Pune, India",
        salary: "₹15,00,000 - ₹25,00,000",
        type: "full-time",
        experienceLevel: "senior",
        description: "Work on big data solutions...",
        requirements: ["Python", "Spark", "AWS"]
      },
      {
        title: "DevOps Engineer",
        company: "Tech Mahindra",
        location: "Noida, India",
        salary: "₹18,00,000 - ₹28,00,000",
        type: "full-time",
        experienceLevel: "senior",
        description: "Lead DevOps transformation...",
        requirements: ["Kubernetes", "Jenkins", "AWS"]
      },
      {
        title: "Full Stack Developer",
        company: "Mindtree",
        location: "Chennai, India",
        salary: "₹10,00,000 - ₹16,00,000",
        type: "full-time",
        experienceLevel: "mid",
        description: "Build end-to-end applications...",
        requirements: ["MERN Stack", "SQL", "REST APIs"]
      }
    ];

    // Add these to your existing sampleJobs array
    sampleJobs.push(...indianJobs);

    // Clear existing jobs first
    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);
    res.json({ message: 'Sample jobs added successfully' });
  } catch (error) {
    console.error('Error seeding jobs:', error);
    res.status(500).json({ message: 'Error seeding jobs' });
  }
});

// Get user's saved jobs
router.get('/saved', auth, async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ user: req.user.userId })
      .populate('job')
      .sort({ savedAt: -1 });

    // Filter out any null jobs and format the response
    const formattedJobs = savedJobs
      .filter(saved => saved.job) // Filter out null jobs
      .map(saved => ({
        _id: saved.job._id,
        title: saved.job.title,
        company: saved.job.company,
        location: saved.job.location,
        salary: saved.job.salary,
        type: saved.job.type,
        experienceLevel: saved.job.experienceLevel,
        description: saved.job.description,
        savedAt: saved.savedAt
      }));

    res.json(formattedJobs);
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's applications
router.get('/applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.userId })
      .populate('job')
      .sort({ appliedAt: -1 });

    // Filter out any null jobs and format the response
    const formattedApplications = applications
      .filter(app => app.job) // Filter out null jobs
      .map(app => ({
        _id: app._id,
        job: {
          _id: app.job._id,
          title: app.job.title,
          company: app.job.company,
          location: app.job.location,
          salary: app.job.salary,
          type: app.job.type,
          experienceLevel: app.job.experienceLevel
        },
        status: app.status,
        appliedAt: app.appliedAt
      }));

    res.json(formattedApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove saved job
router.delete('/:jobId/save', auth, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;

    await SavedJob.findOneAndDelete({ job: jobId, user: userId });
    res.json({ message: 'Job removed from saved list' });
  } catch (error) {
    console.error('Error removing saved job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (for admin or user)
router.patch('/applications/:applicationId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only allow status update if user is admin or the applicant
    if (req.user.role !== 'admin' && application.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.json({ message: 'Application status updated', application });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update the initializeJobs function
const initializeJobs = async () => {
  try {
    // Instead of checking if jobs count is 0, check for specific jobs
    const jobs = [
      {
        title: 'Senior Software Engineer',
        company: 'Google',
        location: 'Bangalore, India',
        salary: '30-45 LPA',
        type: 'full-time',
        experienceLevel: 'senior'
      },
      // ... other Indian jobs ...
    ];

    // For each job, check if it exists and add if it doesn't
    for (const job of jobs) {
      const exists = await Job.findOne({
        title: job.title,
        company: job.company,
        location: job.location
      });

      if (!exists) {
        await Job.create(job);
        console.log(`Added new job: ${job.title} at ${job.company}`);
      }
    }

    console.log('Jobs initialization completed');
  } catch (error) {
    console.error('Error initializing jobs:', error);
  }
};

// Add this to your initialization
const initializeAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new Admin({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123' // This will be hashed automatically
      });
      await admin.save();
      console.log('Admin account created');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

// Call this when the server starts
// Add this right after your routes
initializeJobs();
initializeAdmin();

// Add this new route to add Indian jobs
router.post('/add-indian-jobs', async (req, res) => {
  try {
    const indianJobs = [
      // Same jobs array as above
    ];
    
    await Job.insertMany(indianJobs);
    res.json({ message: 'Indian jobs added successfully' });
  } catch (error) {
    console.error('Error adding Indian jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 