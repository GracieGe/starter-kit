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
import CourseTable from 'src/views/pages/courses/CourseTable'

// Database
import pool from 'src/lib/db';

function Courses({ courses }) {
  return (
    <>
      <Typography variant='p'>
        <IconButton>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/update-information/courses'>Course List</Link>
      </Typography>
      <Box sx={{ p: 5 }}></Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CourseTable courses={courses} />
        </Grid>
      </Grid>
    </>
  )
}

export default Courses

export async function getServerSideProps() {
  let courses = [];

  try {
    const res = await pool.query('SELECT "courseId", "courseName", "grade", "description", "price" FROM "Courses"');
    courses = res.rows;
  } catch (err) {
    console.error('Error fetching courses from database:', err);
  }

  return {
    props: {
      courses,
    },
  };
}