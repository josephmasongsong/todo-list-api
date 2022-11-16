import express from 'express';
import controller from './controller';
const router = express.Router();

router.get('/todos', controller.getTodos);
router.post('/todos', controller.createTodo);
router.get('/todos/:id', controller.getTodo);
router.put('/todos/:id', controller.updateTodo);
router.delete('/todos/:id', controller.deleteTodo);

export default router;
