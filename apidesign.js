const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { authenticate, authorize } = require('./authMiddleware');

app.use(bodyParser.json());

// Endpoint to create a task
app.post('/tasks', authenticate, authorize('create-task'), (req, res) => {
    // Handle task creation
    const taskData = req.body;
    // Call the function to create a task
    createTask(taskData)
        .then(task => res.status(201).json(task))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint to retrieve a task by ID
app.get('/tasks/:task_id', authenticate, (req, res) => {
    const taskId = req.params.task_id;
    // Call the function to get the task by ID
    getTaskById(taskId)
        .then(task => res.status(200).json(task))
        .catch(err => res.status(404).json({ error: err.message }));
});

// Endpoint to update a task by ID
app.put('/tasks/:task_id', authenticate, authorize('update-task'), (req, res) => {
    const taskId = req.params.task_id;
    const taskData = req.body;
    // Call the function to update the task by ID
    updateTask(taskId, taskData)
        .then(task => res.status(200).json(task))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint to delete a task by ID
app.delete('/tasks/:task_id', authenticate, authorize('delete-task'), (req, res) => {
    const taskId = req.params.task_id;
    // Call the function to delete the task by ID
    deleteTask(taskId)
        .then(() => res.status(204).end())
        .catch(err => res.status(404).json({ error: err.message }));
});

// Endpoint to retrieve all tasks
app.get('/tasks', authenticate, (req, res) => {
    // Call the function to get all tasks
    getAllTasks()
        .then(tasks => res.status(200).json(tasks))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
