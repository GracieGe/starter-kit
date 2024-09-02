import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { teacherId, newStatus } = req.body;

    try {
      const userQuery = `
        SELECT "userId" FROM "Teachers" WHERE "teacherId" = $1;
      `;
      const userResult = await pool.query(userQuery, [teacherId]);

      if (userResult.rowCount === 0) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      const userId = userResult.rows[0].userId;

      const updateQuery = `
        UPDATE "Users"
        SET "active" = $1
        WHERE "userId" = $2
        RETURNING *;
      `;
      const updateResult = await pool.query(updateQuery, [newStatus, userId]);

      if (updateResult.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User status updated successfully', user: updateResult.rows[0] });
    } catch (error) {
      console.error('Error updating user status:', error);
      res.status(500).json({ error: 'Failed to update user status' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}