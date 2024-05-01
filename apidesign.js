const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { authenticate, authorize } = require('./authMiddleware');

app.use(bodyParser.json());

app.post('/tasks', authenticate, authorize('create-task'), (req, res) => {
    
    const taskData = req.body;
    createTask(taskData)
        .then(task => res.status(201).json(task))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/tasks/:task_id', authenticate, (req, res) => {
    const taskId = req.params.task_id;
    
    getTaskById(taskId)
        .then(task => res.status(200).json(task))
        .catch(err => res.status(404).json({ error: err.message }));
});


app.put('/tasks/:task_id', authenticate, authorize('update-task'), (req, res) => {
    const taskId = req.params.task_id;
    const taskData = req.body;
    
    updateTask(taskId, taskData)
        .then(task => res.status(200).json(task))
        .catch(err => res.status(400).json({ error: err.message }));
});


app.delete('/tasks/:task_id', authenticate, authorize('delete-task'), (req, res) => {
    const taskId = req.params.task_id;
    
    deleteTask(taskId)
        .then(() => res.status(204).end())
        .catch(err => res.status(404).json({ error: err.message }));
});


app.get('/tasks', authenticate, (req, res) => {
    
    getAllTasks()
        .then(tasks => res.status(200).json(tasks))
        .catch(err => res.status(400).json({ error: err.message }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
