import pool from '../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { courseNameNew, gradeNew, descriptionNew, priceNew } = req.body;

    try {
      const insertCourseQuery = `
        INSERT INTO "Courses" ("courseName", "grade", "description", "price")
        VALUES ($1, $2, $3, $4) RETURNING *;
      `;
      
      const insertCourseValues = [courseNameNew, gradeNew, descriptionNew, priceNew];
      const result = await pool.query(insertCourseQuery, insertCourseValues);

      res.status(200).json({ message: 'Course created successfully', course: result.rows[0] });
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Failed to create course' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}