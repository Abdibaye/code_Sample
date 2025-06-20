import {  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService } from '../model/userModels.js';
import pool from '../config/db.js';

// Standardized response format
const standardResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: status < 400,
    message,
    data,
  });
};

// CREATE user
export const createUserController = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await createUserService(userData);
    standardResponse(res, 201, 'User created successfully', newUser);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    next({
      status: 500,
      message: 'Failed to create user',
      error: error.message,
    });
  }
};

// GET all users
export const getUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    standardResponse(res, 200, 'Users fetched successfully', users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    next({
      status: 500,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

// GET user by ID
export const getUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (!user) {
      return next({
        status: 404,
        message: `User with ID ${id} not found`,
      });
    }
    standardResponse(res, 200, 'User fetched successfully', user);
  } catch (error) {
    console.error(`❌ Error fetching user with ID ${id}:`, error);
    next({
      status: 500,
      message: 'Failed to fetch user',
      error: error.message,
    });
  }
};

// UPDATE user
export const updateUserController = async (req, res, next) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUserService(id, userData);
    if (!updatedUser) {
      return next({
        status: 404,
        message: `User with ID ${id} not found`,
      });
    }
    standardResponse(res, 200, 'User updated successfully', updatedUser);
  } catch (error) {
    console.error(`❌ Error updating user with ID ${id}:`, error);
    next({
      status: 500,
      message: 'Failed to update user',
      error: error.message,
    });
  }
};

// DELETE user
export const deleteUserController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (!user) {
      return next({
        status: 404,
        message: `User with ID ${id} not found`,
      });
    }
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    standardResponse(res, 200, 'User deleted successfully');
  } catch (error) {
    console.error(`❌ Error deleting user with ID ${id}:`, error);
    next({
      status: 500,
      message: 'Failed to delete user',
      error: error.message,
    });
  }
};
