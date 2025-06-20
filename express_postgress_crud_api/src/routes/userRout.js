import express from 'express';
import {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController
} from '../controller/userController.js';

const router = express.Router();

router.post('/user', createUserController);
router.get('/user', getUsersController);
router.get('/user/:id', getUserByIdController);
router.put('/user/:id', updateUserController);
router.delete('/user/:id', deleteUserController);



export default router;
