const { expect } = require('chai');
const request = require('supertest');
const app = require('./app');

describe('Task Management API', () => {
    it('should create a task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: 'Test Task',
                description: 'This is a test task.',
                status: 'pending',
            });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('task_id');
        expect(res.body.title).to.equal('Test Task');
    });

  
});
