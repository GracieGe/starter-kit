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
import SessionTable from 'src/views/pages/sessions-management/SessionTable'

// ** Database Import
import pool from 'src/lib/db';

function SessionsManagement({ sessions }) {

  return (
    <>
      <Typography variant='p'>
        <IconButton>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/sessions-management'>Session List</Link>
      </Typography>
      <Box sx={{ p: 5 }}></Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SessionTable sessions={sessions} />
        </Grid>
      </Grid>
    </>
  )
}

export default SessionsManagement

export async function getServerSideProps() {
  let sessions = [];

  try {
    const res = await pool.query(`
      SELECT 
        S."sessionId", 
        S."location", 
        S."date"::text AS "date",
        TO_CHAR(S."startTime", 'HH24:MI') AS "startTime",
        TO_CHAR(S."endTime", 'HH24:MI') AS "endTime",
        S."date" || ' ' || TO_CHAR(S."startTime", 'HH24:MI') || ' - ' || TO_CHAR(S."endTime", 'HH24:MI') AS "sessionTime",
        S."recording_student",
        S."recording_teacher",
        S."status",
        ST."fullName" AS "studentName",
        T."fullName" AS "teacherName",
        C."courseName"
      FROM 
        "Sessions" S
      JOIN 
        "Students" ST ON S."studentId" = ST."studentId"
      JOIN 
        "Teachers" T ON S."teacherId" = T."teacherId"
      JOIN 
        "Courses" C ON T."courseId" = C."courseId"
    `);
    sessions = res.rows

    console.log('Sessions:', sessions);
  } catch (err) {
    console.error('Error fetching sessions from database:', err);
  }

  return {
    props: {
      sessions,
    },
  };
}