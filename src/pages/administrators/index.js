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
import AdminTable from 'src/views/pages/administrators/AdminTable'

function Administrators() {
  const adminList = [];  

  return (
    <>
      <Typography variant='p'>
        <IconButton href='/dashboards/allboroughs'>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/administrators'>Administrators</Link>
      </Typography>
      <Box sx={{ p: 5 }}></Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <AdminTable admins={adminList} />
        </Grid>
      </Grid>
    </>
  )
}

export default Administrators