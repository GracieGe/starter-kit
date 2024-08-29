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

// Database
import pool from 'src/lib/db';

function Administrators({ admins }) {
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
          <AdminTable admins={admins} />
        </Grid>
      </Grid>
    </>
  );
}

export default Administrators;

export async function getServerSideProps() {
  let admins = [];

  try {
    // 从数据库查询所需的字段
    const res = await pool.query('SELECT "adminId", "fullName", "phoneNumber", "email", "role", "active" FROM "Admins"');
    admins = res.rows; // 从查询结果中获取所有行
  } catch (err) {
    console.error('Error fetching admins from database:', err);
  }

  return {
    props: {
      admins, // 将管理员数据传递给页面组件
    },
  };
}