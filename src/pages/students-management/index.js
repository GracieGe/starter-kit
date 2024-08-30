// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Imports
import StudentTable from 'src/views/pages/students-management/StudentTable'

// ** Database Import
import pool from 'src/lib/db';

function StudentsManagement({ students }) {
  return (
    <>
      <Typography variant='p'>
        <IconButton>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/students-management'>Student List</Link>
      </Typography>
      <Box sx={{ p: 5 }}></Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <StudentTable students={students} />
        </Grid>
      </Grid>
    </>
  )
}

export default StudentsManagement

export async function getServerSideProps() {
  let students = [];

  try {
    const res = await pool.query(`
      SELECT 
        S."studentId", 
        S."fullName", 
        S."grade", 
        U."phoneNumber", 
        U."active", 
        COALESCE(SUM(O."amount"), 0) AS "totalAmount"
      FROM 
        "Students" S
      JOIN 
        "Users" U ON S."userId" = U."userId"
      LEFT JOIN 
        "Orders" O ON U."userId" = O."userId"
      GROUP BY 
        S."studentId", 
        S."fullName", 
        S."grade", 
        U."phoneNumber", 
        U."active"
    `);
    students = res.rows;
  } catch (err) {
    console.error('Error fetching students from database:', err);
  }

  return {
    props: {
      students,
    },
  };
}