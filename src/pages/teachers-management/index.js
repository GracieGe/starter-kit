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
import TeacherTable from 'src/views/pages/teachers-management/TeacherTable'

// ** Database Import
import pool from 'src/lib/db';

function TeachersManagement({ teachers }) {
  return (
    <>
      <Typography variant='p'>
        <IconButton>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/teachers-management'>Teacher List</Link>
      </Typography>
      <Box sx={{ p: 5 }}></Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TeacherTable teachers={teachers} />
        </Grid>
      </Grid>
    </>
  )
}

export default TeachersManagement

export async function getServerSideProps() {
  let teachers = [];

  try {
    const res = await pool.query(`
      SELECT 
        T."teacherId", 
        T."fullName", 
        T."teachingYears", 
        T."status", 
        T."rating", 
        U."phoneNumber", 
        U."active", 
        C."courseName"
      FROM 
        "Teachers" T
      JOIN 
        "Users" U ON T."userId" = U."userId"
      JOIN 
        "Courses" C ON T."courseId" = C."courseId"
    `);
    teachers = res.rows;
  } catch (err) {
    console.error('Error fetching teachers from database:', err);
  }

  return {
    props: {
      teachers,
    },
  };
}