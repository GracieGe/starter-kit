import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { courseId } = req.query;

    try {
      const getCourseQuery = 'SELECT * FROM "Courses" WHERE "courseId" = $1';
      const result = await pool.query(getCourseQuery, [courseId]);

      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}