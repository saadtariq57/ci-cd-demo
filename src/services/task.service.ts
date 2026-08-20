import { Task, UpdateTaskDto } from '../types/task.js';

export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  public getAllTasks(): Task[] {
    return [...this.tasks];
  }

  public getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(title: string): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: title.trim(),
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  public updateTask(id: number, updates: UpdateTaskDto): Task | undefined {
    const task = this.getTaskById(id);
    if (!task) {
      return undefined;
    }

    if (updates.title !== undefined) {
      task.title = updates.title.trim();
    }
    if (updates.completed !== undefined) {
      task.completed = updates.completed;
    }

    return task;
  }

  public deleteTask(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
    this.tasks.splice(index, 1);
    return true;
  }

  public reset(): void {
    this.tasks = [];
    this.nextId = 1;
  }
}

export const taskService = new TaskService();
