import { useState } from 'react'
import CreateAdminForm from 'src/views/pages/administrators/createAdmin/CreateNewAdmin'
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

function createNewAdmin() {
  return (
    <>
      <Typography variant='p'>
        <IconButton>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/administrators'>Administrators</Link> /{' '}
        <Link href='/administrators/create'>Create New Admin</Link>
      </Typography>

      <CreateAdminForm />
    </>
  )
}

export default createNewAdmin