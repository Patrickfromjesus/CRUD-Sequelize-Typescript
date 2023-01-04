import express from 'express';
import userController from '../database/Controllers/userController';
import userMidd from '../database/middlewares/userMidd';

const router = express.Router();

router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.post('/login', userMidd.validateLogin, userController.getByEmail);
router.post('/users', userMidd.validateLogin, userMidd.validateRegister, userController.create);
router.put('/users/:id', userMidd.validateId, userController.update);
router.delete('/users/:id', userMidd.validateId, userController.destroy);

export default router;
