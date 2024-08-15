import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT * FROM "Courses"');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}