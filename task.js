const db = require('./db'); 

async function createTask(taskData) {
    const { title, description, status, assigned_user } = taskData;
    const result = await db.query(
        'INSERT INTO tasks (title, description, status, assigned_user) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, status, assigned_user]
    );
    return result.rows[0];
}


async function getTaskById(taskId) {
    const result = await db.query('SELECT * FROM tasks WHERE task_id = $1', [taskId]);
    if (result.rows.length === 0) {
        throw new Error('Task not found');
    }
    return result.rows[0];
}


async function updateTask(taskId, taskData) {
    const { title, description, status, assigned_user } = taskData;
    const result = await db.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3, assigned_user = $4, updated_at = CURRENT_TIMESTAMP WHERE task_id = $5 RETURNING *',
        [title, description, status, assigned_user, taskId]
    );
    if (result.rows.length === 0) {
        throw new Error('Task not found');
    }
    return result.rows[0];
}


async function deleteTask(taskId) {
    const result = await db.query('DELETE FROM tasks WHERE task_id = $1', [taskId]);
    if (result.rowCount === 0) {
        throw new Error('Task not found');
    }
}


async function getAllTasks() {
    const result = await db.query('SELECT * FROM tasks');
    return result.rows;
}
