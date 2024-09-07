import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, newStatus } = req.body;

    try {
      const updateQuery = `
        UPDATE "Admins"
        SET "active" = $1
        WHERE "adminId" = $2
        RETURNING *;
      `;
      const values = [newStatus, id];
      const result = await pool.query(updateQuery, values);

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Admin not found' });
      } else {
        res.status(200).json({ message: 'Admin status updated successfully', admin: result.rows[0] });
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
      res.status(500).json({ error: 'Failed to update admin status' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}