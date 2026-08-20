import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { taskService } from '../src/services/task.service.js';

describe('Task API Integration Tests', () => {
  beforeEach(() => {
    taskService.reset();
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Task Management API',
      });
    });
  });

  describe('GET /tasks', () => {
    it('should return empty list when no tasks exist', async () => {
      const response = await request(app).get('/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return list of all tasks', async () => {
      taskService.createTask('First Task');
      taskService.createTask('Second Task');

      const response = await request(app).get('/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({ id: 1, title: 'First Task', completed: false });
      expect(response.body[1]).toMatchObject({ id: 2, title: 'Second Task', completed: false });
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return task when requested with valid existing ID', async () => {
      const created = taskService.createTask('Learn Vitest');

      const response = await request(app).get(`/tasks/${created.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: created.id,
        title: 'Learn Vitest',
        completed: false,
      });
    });

    it('should return 404 error when task does not exist', async () => {
      const response = await request(app).get('/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Task not found',
      });
    });

    it('should return 404 error when ID is not a valid number', async () => {
      const response = await request(app).get('/tasks/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Task not found',
      });
    });
  });

  describe('POST /tasks', () => {
    it('should create task successfully with valid title', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: 'Learn TypeScript' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        title: 'Learn TypeScript',
        completed: false,
      });

      const tasks = taskService.getAllTasks();
      expect(tasks).toHaveLength(1);
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Title is required',
      });
    });

    it('should return 400 when title is an empty string', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: '   ' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Title is required',
      });
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update task title and completed status', async () => {
      const created = taskService.createTask('Learn TypeScript');

      const response = await request(app)
        .patch(`/tasks/${created.id}`)
        .send({
          title: 'Learn TypeScript properly',
          completed: true,
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: created.id,
        title: 'Learn TypeScript properly',
        completed: true,
      });
    });

    it('should allow updating title only', async () => {
      const created = taskService.createTask('Initial Title');

      const response = await request(app)
        .patch(`/tasks/${created.id}`)
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: created.id,
        title: 'Updated Title',
        completed: false,
      });
    });

    it('should allow updating completed status only', async () => {
      const created = taskService.createTask('Initial Title');

      const response = await request(app)
        .patch(`/tasks/${created.id}`)
        .send({ completed: true });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: created.id,
        title: 'Initial Title',
        completed: true,
      });
    });

    it('should return 404 when updating nonexistent task', async () => {
      const response = await request(app)
        .patch('/tasks/999')
        .send({ title: 'Nonexistent' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Task not found',
      });
    });

    it('should return 400 when provided title is empty string', async () => {
      const created = taskService.createTask('Initial Title');

      const response = await request(app)
        .patch(`/tasks/${created.id}`)
        .send({ title: '' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Title must be a non-empty string',
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete task and return success message', async () => {
      const created = taskService.createTask('Task to delete');

      const response = await request(app).delete(`/tasks/${created.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Task deleted successfully',
      });

      expect(taskService.getTaskById(created.id)).toBeUndefined();
    });

    it('should return 404 when deleting nonexistent task', async () => {
      const response = await request(app).delete('/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Task not found',
      });
    });
  });
});
