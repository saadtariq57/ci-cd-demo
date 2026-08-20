import { Request, Response } from 'express';
import { taskService } from '../services/task.service.js';

export class TaskController {
  private parseId(param: string | string[] | undefined): number {
    if (typeof param !== 'string') {
      return NaN;
    }
    return parseInt(param, 10);
  }

  public getAllTasks(_req: Request, res: Response): void {
    const tasks = taskService.getAllTasks();
    res.status(200).json(tasks);
  }

  public getTaskById(req: Request, res: Response): void {
    const id = this.parseId(req.params.id);
    if (isNaN(id)) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    const task = taskService.getTaskById(id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  }

  public createTask(req: Request, res: Response): void {
    const { title } = req.body || {};

    if (!title || typeof title !== 'string' || title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const newTask = taskService.createTask(title);
    res.status(201).json(newTask);
  }

  public updateTask(req: Request, res: Response): void {
    const id = this.parseId(req.params.id);
    if (isNaN(id)) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    const { title, completed } = req.body || {};

    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      res.status(400).json({ error: 'Title must be a non-empty string' });
      return;
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      res.status(400).json({ error: 'Completed must be a boolean' });
      return;
    }

    const updatedTask = taskService.updateTask(id, { title, completed });
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json(updatedTask);
  }

  public deleteTask(req: Request, res: Response): void {
    const id = this.parseId(req.params.id);
    if (isNaN(id)) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    const deleted = taskService.deleteTask(id);
    if (!deleted) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  }
}

export const taskController = new TaskController();

