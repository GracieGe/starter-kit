import { useState } from 'react'
import CreateCourseForm from 'src/views/pages/courses/createCourse/CreateNewCourse'
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

function createNewCourse() {
  return (
    <>
      <Typography variant='p'>
        <IconButton>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/update-information/courses'>Courses</Link> /{' '}
        <Link href='/update-information/courses/create'>Create New Course</Link>
      </Typography>

      <CreateCourseForm />
    </>
  )
}

export default createNewCourse