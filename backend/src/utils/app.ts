import express from 'express';
import cors from 'cors';
import userController from '../database/Controllers/userController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', userController.getAll);
app.post('/login', userController.getByEmail);
app.get('/users/:id', userController.getById);
app.post('/users', userController.create);
app.put('/users/:id', userController.update);
app.delete('/users/:id', userController.destroy);

export default app;