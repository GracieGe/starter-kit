import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Invalid input. No IDs provided.' });
    }

    try {
      const deleteQuery = `
        DELETE FROM "Admins"
        WHERE "adminId" = ANY($1::int[]);
      `;
      const result = await pool.query(deleteQuery, [ids]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'No admins found with the provided IDs.' });
      }

      res.status(200).json({ message: 'Admins deleted successfully', deletedCount: result.rowCount });
    } catch (error) {
      console.error('Error deleting admins:', error);
      res.status(500).json({ error: 'Failed to delete admins' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}