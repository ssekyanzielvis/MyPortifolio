Single-Page Portfolio Website Creation Guide

This guide provides step-by-step instructions for building a single-page portfolio website using HTML, CSS, and JavaScript for the frontend, with a simple Node.js backend using Express to handle and store user requests (e.g., contact form submissions). The portfolio will be a responsive single-page application (SPA) featuring a profile picture, bio data, works (projects), links to GitHub, LinkedIn, WhatsApp, email, location, phone contact, a questionnaire/contact form, and additional sections like skills and education.

Project Overview





Purpose: A professional single-page portfolio to showcase your profile, skills, projects, and contact information, with a backend to store form submissions (e.g., inquiries or questionnaire responses).



Technologies:





Frontend: HTML, CSS, JavaScript.



Backend: Node.js with Express.js (for handling form submissions) and file system (fs) module to store data in a JSON file (simple storage without a database).



Features:





Responsive navigation with smooth scrolling.



Sections: Hero (with profile picture and bio), About (bio data, skills, education), Projects (works), Contact (form with questionnaire fields, links to socials, email, phone, location, WhatsApp).



Form submission to backend for storing user requests.



Hover effects, animations, and basic validation.

Prerequisites





Node.js installed (for backend).



Basic knowledge of HTML, CSS, JS, and Node.js.

File Structure

Create the following structure in a project directory:

portfolio/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styling
│   ├── script.js       # JavaScript for interactivity
│   └── profile.jpg     # Your profile picture (replace with actual image)
├── server.js           # Node.js backend server
├── requests.json       # JSON file to store form submissions (created automatically)
└── package.json        # For Node dependencies

Run npm init -y in the root directory to create package.json, then install Express: npm install express body-parser.

Step-by-Step Implementation

1. HTML Structure (public/index.html)

This sets up a single-page layout with sections accessible via navigation.

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <section id="hero">
    <div class="hero-content">
      <img src="profile.jpg" alt="Profile Picture" class="profile-pic">
      <h1>[Your Name]</h1>
      <p>[Your Profession, e.g., Full-Stack Developer]</p>
    </div>
  </section>

  <section id="about">
    <h2>About Me</h2>
    <p>[Bio data: A short paragraph about yourself, experience, and interests.]</p>
    <h3>Skills</h3>
    <ul>
      <li>HTML, CSS, JavaScript</li>
      <li>Node.js, Express</li>
      <li>[Add more skills]</li>
    </ul>
    <h3>Education</h3>
    <p>[Degree, Institution, Year]</p>
    <h3>Location</h3>
    <p>[Your City, Country]</p>
  </section>

  <section id="projects">
    <h2>My Projects</h2>
    <div class="project-container">
      <div class="project-card">
        <h3>Project 1</h3>
        <p>[Description]</p>
        <a href="[GitHub Link]" target="_blank">View on GitHub</a>
      </div>
      <div class="project-card">
        <h3>Project 2</h3>
        <p>[Description]</p>
        <a href="[GitHub Link]" target="_blank">View on GitHub</a>
      </div>
      <!-- Add more cards -->
    </div>
  </section>

  <section id="contact">
    <h2>Contact Me</h2>
    <p>Email: <a href="mailto:[your.email@example.com]">[your.email@example.com]</a></p>
    <p>Phone: [Your Phone Number]</p>
    <p>LinkedIn: <a href="[LinkedIn URL]" target="_blank">LinkedIn Profile</a></p>
    <p>GitHub: <a href="[GitHub URL]" target="_blank">GitHub Profile</a></p>
    <p>WhatsApp: <a href="https://wa.me/[Your WhatsApp Number]" target="_blank">Chat on WhatsApp</a></p>
    
    <h3>Questionnaire / Contact Form</h3>
    <form id="contact-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <label for="question">Question/Message:</label>
      <textarea id="question" name="question" required></textarea>
      <button type="submit">Submit</button>
    </form>
  </section>

  <script src="script.js"></script>
</body>
</html>

2. CSS Styling (public/styles.css)

Make it responsive and visually appealing.

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  line-height: 1.6;
  color: #333;
}

header {
  background: #333;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
}

nav ul li {
  margin: 0 1rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  color: #ddd;
}

section {
  padding: 4rem 2rem;
  text-align: center;
}

#hero {
  background: #f4f4f4;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.project-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.project-card {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  width: 300px;
  transition: transform 0.3s;
}

.project-card:hover {
  transform: scale(1.05);
}

#contact form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

#contact input, #contact textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
}

#contact button {
  padding: 0.5rem;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
  }
  .project-card {
    width: 100%;
  }
}

3. JavaScript Interactivity (public/script.js)

Handle smooth scrolling and form submission to backend.

// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    question: document.getElementById('question').value.trim()
  };
  
  if (!formData.name || !formData.email || !formData.question) {
    alert('Please fill all fields.');
    return;
  }
  
  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      alert('Submitted successfully!');
      this.reset();
    } else {
      alert('Submission failed.');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

4. Backend (server.js)

A simple Node.js server to handle form submissions and store them in requests.json.

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const data = req.body;
  let requests = [];
  
  if (fs.existsSync('requests.json')) {
    requests = JSON.parse(fs.readFileSync('requests.json', 'utf8'));
  }
  
  requests.push({ ...data, timestamp: new Date().toISOString() });
  fs.writeFileSync('requests.json', JSON.stringify(requests, null, 2));
  
  res.status(200).send('Success');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

Instructions for the Developer





Setup:





Create the file structure.



Install dependencies: npm install express body-parser.



Replace placeholders (e.g., names, links, image) with actual data.



Add more sections or fields as needed (e.g., resume download link).



Running the Project:





Start the server: node server.js.



Open http://localhost:3000 in a browser.



Test form: Submit and check requests.json for stored data.



Customization:





Add animations (e.g., via CSS transitions).



Enhance backend: Use a real database like MongoDB for production.



Deploy: Host frontend on Netlify/GitHub Pages, backend on Heroku/Vercel.



Testing:





Ensure responsiveness on mobile.



Validate form and check console for errors.



Test links and image loading.

Notes





For production, secure the backend (e.g., add CORS, validation).



The questionnaire is implemented as a simple form; expand fields for more questions.



Add icons (e.g., via Font Awesome) for social links.
