import express, { Request, Response } from 'express';
import { TaskModel, ITask } from "../models/task-model"; 

const router = express.Router();

// Create a new task
router.post('/tasks', async (req: Request, res: Response) => {
    try {
        const taskData: ITask = req.body;
        const newTask = await TaskModel.create(taskData);
        res.status(201).json(newTask);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks
router.get('/tasks', async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single task by ID
router.get('/tasks/:id', async (req: Request, res: Response) => {
    const taskId = req.params.id;
    try {
        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task by ID
router.put('/tasks/:id', async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const updateData: Partial<ITask> = req.body;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task by ID
router.delete('/tasks/:id', async (req: Request, res: Response) => {
    const taskId = req.params.id;
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
