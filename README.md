# JobSprout – Full Stack Job Portal

JobSprout is a modern full-stack job portal built with React, Node.js, and MongoDB. It connects job seekers with employers and includes tools for career tracking, job management, and admin control.

## 🚀 Features

### For Job Seekers
- Secure JWT-based login & registration
- Search & filter jobs
- Apply and track applications
- Save/bookmark jobs
- Profile with resume, skills, and education
- User dashboard with analytics

### For Employers/Admin
- Admin dashboard with stats
- Post, update, and delete jobs
- Review and update application statuses
- Manage users

## 🛠 Tech Stack

**Frontend**: React, React Router, Axios, Recharts, FontAwesome  
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt  
**Others**: dotenv, CORS, custom CSS

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/dbe7dd7c-9fb0-408c-8c3c-3da963038684)
![image](https://github.com/user-attachments/assets/069ade25-8fa5-4a36-b1b4-9dac8324a2e9)
![image](https://github.com/user-attachments/assets/ae5b3c5a-496d-43d3-be4d-51a3af328df1)
![image](https://github.com/user-attachments/assets/d1e7e995-209c-4ff9-a362-9bd1b0215de1)
![image](https://github.com/user-attachments/assets/5c494bad-a8ba-4984-91b2-8f5e0c111b48)

## 🧩 Project Structure

```

root/
├── client/       # React frontend
├── backend/      # Express backend
├── .gitignore
└── README.md

````

## ⚙️ Installation

```bash
git clone https://github.com/utk1college/JobSprout.git
cd JobSprout

# Install root deps if needed
npm install

# Backend setup
cd backend
npm install
cp .env.example .env

# Frontend setup
cd ../client
npm install
````

## 🔐 Environment Variables (Backend)

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret
```

## 🏃 Running Locally

```bash
# From root (requires concurrently)
npm install -g concurrently
npm run dev
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5001](http://localhost:5001)

## 🔧 API Overview

**Auth**: `/api/auth/login`, `/api/auth/register`
**Jobs**: `/api/jobs`, `/api/jobs/:id/apply`, `/api/jobs/:id/save`
**Admin**: `/api/admin/dashboard`, `/api/admin/users`

## 🧠 Notes

* MongoDB must be running
* Admin account needs manual creation in DB
* Auth uses JWT + role-based access

## 📌 Todo

- Seed admin user and job data
- Add email notifications
- Implement resume parsing and smart recommendations

## 🙌 Built by

[Utkrisht](https://github.com/utk1college)
