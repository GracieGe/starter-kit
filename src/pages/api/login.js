import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, password } = req.body;

    try {
      const query = `
        SELECT * FROM "Admins" WHERE "phoneNumber" = $1;
      `;
      const result = await pool.query(query, [phoneNumber]);

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid phone number or password' });
      }

      const user = result.rows[0];

      if (!user.active) {
        return res.status(403).json({ error: 'Account is deactivated. Please activate your account first.' });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid phone number or password' });
      }

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.adminId,
          fullName: user.fullName,
          role: user.role,
          email: user.email,
          active: user.active
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}