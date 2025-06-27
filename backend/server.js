const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let projects = [];

// Routes

// Get all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Get project by ID
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// Create new project
app.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  const newProject = {
    id: uuidv4(),
    name,
    description
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Update a project
app.put('/api/projects/:id', (req, res) => {
  const { name, description } = req.body;
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  if (name) project.name = name;
  if (description) project.description = description;

  res.json(project);
});

// Delete a project
app.delete('/api/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });

  const deletedProject = projects.splice(index, 1);
  res.json(deletedProject[0]);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
