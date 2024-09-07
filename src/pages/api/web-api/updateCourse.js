import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { courseId, courseName, grade, description, price } = req.body;

    try {
      const updateCourseQuery = `
        UPDATE "Courses"
        SET "courseName" = $1, "grade" = $2, "description" = $3, "price" = $4
        WHERE "courseId" = $5
        RETURNING *;
      `;

      const updateCourseValues = [courseName, grade, description, price, courseId];
      const result = await pool.query(updateCourseQuery, updateCourseValues);

      res.status(200).json({ message: 'Course updated successfully', course: result.rows[0] });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Failed to update course' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}