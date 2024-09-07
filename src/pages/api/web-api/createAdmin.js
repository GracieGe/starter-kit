import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumberNew, fullNameNew, emailNew, passwordNew, roleNew } = req.body;

    try {
      const insertUserQuery = `
        INSERT INTO "Admins" ("fullName", "phoneNumber", "email", "password", "role")
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
      
      const insertUserValues = [fullNameNew, phoneNumberNew, emailNew, passwordNew, roleNew];
      const result = await pool.query(insertUserQuery, insertUserValues);

      res.status(200).json({ message: 'Admin created successfully', admin: result.rows[0] });
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'Failed to create admin' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}