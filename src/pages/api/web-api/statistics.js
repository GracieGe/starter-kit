import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const studentsQuery = 'SELECT COUNT("studentId") FROM "Students"'
      const teachersQuery = 'SELECT COUNT("teacherId") FROM "Teachers"'
      const uniqueUsersQuery = 'SELECT COUNT(DISTINCT "userId") FROM "Orders"'
      const signedTeachersQuery = 'SELECT COUNT("teacherId") FROM "Teachers" WHERE "status" = \'Signed\''
      const sessionsQuery = 'SELECT COUNT("sessionId") FROM "Sessions"'
      const totalVolumeQuery = 'SELECT SUM("amount") as "totalVolume" FROM "Orders"'

      const [studentsResult, teachersResult, uniqueUsersResult, signedTeachersResult, sessionsResult, totalVolumeResult] = await Promise.all([
        pool.query(studentsQuery),
        pool.query(teachersQuery),
        pool.query(uniqueUsersQuery),
        pool.query(signedTeachersQuery),
        pool.query(sessionsQuery) ,
        pool.query(totalVolumeQuery)
      ])

      const studentsCount = studentsResult.rows[0].count
      const teachersCount = teachersResult.rows[0].count
      const uniqueUsersCount = uniqueUsersResult.rows[0].count
      const signedTeachersCount = signedTeachersResult.rows[0].count
      const sessionsCount = sessionsResult.rows[0].count 
      const totalVolume = totalVolumeResult.rows[0].totalVolume || 0

      res.status(200).json({
        studentsCount,
        teachersCount,
        uniqueUsersCount,
        signedTeachersCount,
        sessionsCount,
        totalVolume
      })
    } catch (error) {
      console.error('Error fetching statistics:', error)
      res.status(500).json({ error: 'Failed to fetch statistics' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}