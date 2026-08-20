import { describe, it, expect, beforeEach } from 'vitest';
import { TaskService } from '../src/services/task.service.js';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  it('should create a task with an auto-incremented ID and default completed status', () => {
    const task1 = service.createTask('Task One');
    const task2 = service.createTask('Task Two');

    expect(task1).toEqual({
      id: 1,
      title: 'Task One',
      completed: false,
    });
    expect(task2).toEqual({
      id: 2,
      title: 'Task Two',
      completed: false,
    });
  });

  it('should return all created tasks', () => {
    service.createTask('Task One');
    service.createTask('Task Two');

    const tasks = service.getAllTasks();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Task One');
    expect(tasks[1].title).toBe('Task Two');
  });

  it('should get a task by its ID', () => {
    const created = service.createTask('Task One');
    const found = service.getTaskById(created.id);

    expect(found).toBeDefined();
    expect(found?.id).toBe(created.id);
    expect(found?.title).toBe('Task One');
  });

  it('should return undefined when requesting a nonexistent task ID', () => {
    const result = service.getTaskById(999);
    expect(result).toBeUndefined();
  });

  it('should update task title and completed status', () => {
    const created = service.createTask('Task One');
    
    const updated = service.updateTask(created.id, {
      title: 'Updated Task One',
      completed: true,
    });

    expect(updated).toBeDefined();
    expect(updated?.title).toBe('Updated Task One');
    expect(updated?.completed).toBe(true);

    const retrieved = service.getTaskById(created.id);
    expect(retrieved?.title).toBe('Updated Task One');
    expect(retrieved?.completed).toBe(true);
  });

  it('should allow partial updates (title only or completed only)', () => {
    const created = service.createTask('Task One');

    const updatedTitleOnly = service.updateTask(created.id, { title: 'New Title' });
    expect(updatedTitleOnly?.title).toBe('New Title');
    expect(updatedTitleOnly?.completed).toBe(false);

    const updatedCompletedOnly = service.updateTask(created.id, { completed: true });
    expect(updatedCompletedOnly?.title).toBe('New Title');
    expect(updatedCompletedOnly?.completed).toBe(true);
  });

  it('should return undefined when updating a nonexistent task', () => {
    const result = service.updateTask(999, { title: 'Nonexistent' });
    expect(result).toBeUndefined();
  });

  it('should delete a task by ID', () => {
    const created = service.createTask('Task to delete');
    const deleteResult = service.deleteTask(created.id);

    expect(deleteResult).toBe(true);
    expect(service.getTaskById(created.id)).toBeUndefined();
    expect(service.getAllTasks()).toHaveLength(0);
  });

  it('should return false when deleting a nonexistent task', () => {
    const deleteResult = service.deleteTask(999);
    expect(deleteResult).toBe(false);
  });
});
