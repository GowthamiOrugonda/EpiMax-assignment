# EpiMax-assignment
1.API Design:
POST /tasks: Creates a new task.
GET /tasks/:task_id: Retrieves a task by its ID.
PUT /tasks/:task_id: Updates a task by its ID.
DELETE /tasks/:task_id: Deletes a task by its ID.
GET /tasks: Retrieves all tasks.
2.Database Schema:
task_id: Primary key for uniquely identifying tasks.
title: Title of the task (VARCHAR).
description: Description of the task (TEXT).
status: Status of the task, which can be 'pending' or 'completed' (ENUM).
created_at, updated_at: Timestamps indicating when the task was created and last updated.

3.Backend Logic:

createTask: Inserts a new task into the database.
getTaskById: Retrieves a task by its ID.
updateTask: Updates an existing task.
deleteTask: Deletes a task.
getAllTasks: Retrieves all tasks from the database.

4.Authentication and Authorization:
Authentication Middleware: The authenticate middleware verifies JWT tokens extracted from request headers. If the token is valid, it sets the user object in the request for subsequent middleware/functions to use.
Authorization Middleware: The authorize middleware checks if the authenticated user has the required permissions (based on their role) to access a specific endpoint. Permissions are defined for each CRUD operation, and access is granted or denied accordingly.

5.Testing and Debugging:
Unit Testing: Unit tests are crucial for verifying the correctness of individual components (functions, endpoints) in your application. The provided example demonstrates how to write unit tests using the Mocha, Chai, and Supertest libraries.
Debugging: Debugging tools and techniques, such as logging, error tracking, and debugging tools in IDEs, can be used to identify and fix issues during development and testing phases.
