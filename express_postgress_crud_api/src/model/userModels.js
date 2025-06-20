import pool from "../config/db.js";

export const getAllUsersService = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    throw error;    
  }
};

export const getUserByIdService = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`❌ Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const createUserService = async (userData) => {
  const { username, email, password } = userData;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error creating user:', error);
    throw error;
  }
};

export const updateUserService = async (id, userData) => {
  const { username, email, password } = userData;
  try {
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [username, email, password, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`❌ Error updating user with ID ${id}:`, error);
    throw error;
  }
};
