import express, { Express } from 'express';
import taskRoutes from './routes/task.routes.js';

const app: Express = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Task Management API' });
});

app.use('/tasks', taskRoutes);

export default app;
