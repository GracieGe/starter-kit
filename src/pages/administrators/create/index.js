import { useEffect, useState } from 'react'
import CreateAdminForm from 'src/views/pages/administrators/createAdmin/CreateNewAdmin'
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

function CreateNewAdmin() {
  const [role, setRole] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole')
    if (!storedRole) {
      router.push('/login')
    } else {
      setRole(storedRole)
    }
  }, [router])

  if (!role) {
    return <p>Loading...</p>
  }
  
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

export default CreateNewAdmin