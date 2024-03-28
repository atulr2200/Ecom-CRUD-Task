
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://atulrathod2200:atul@task.xrebboc.mongodb.net/?retryWrites=true&w=majority&appName=Task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create Task model
const Task = mongoose.model('Task', taskSchema);

// API endpoints

// Create a task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific task
app.get('/api/tasks/:id', getTask, (req, res) => {
  res.json(res.task);
});

// Update a task
app.put('/api/tasks/:id', getTask, async (req, res) => {
  try {
    res.task.title = req.body.title || res.task.title;
    res.task.description = req.body.description || res.task.description;
    res.task.status = req.body.status || res.task.status;
    res.task.updatedAt = Date.now();
    await res.task.save();
    res.json(res.task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get task by ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

// Documentation
app.get('/api', (req, res) => {
  const documentation = `
    <h1>Shopping Portal API Documentation</h1>
    <p>Endpoints:</p>
    <ul>
      <li>POST /api/tasks - Create a task</li>
      <li>GET /api/tasks - Get all tasks</li>
      <li>GET /api/tasks/:id - Get a specific task</li>
      <li>PUT /api/tasks/:id - Update a task</li>
      <li>DELETE /api/tasks/:id - Delete a task</li>
    </ul>
  `;
  res.send(documentation);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

