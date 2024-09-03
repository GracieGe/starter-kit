import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const CRMDashboard = () => {
  const [data, setData] = useState([
    { stats: 'Loading...', title: 'Registered students', src: '/images/cards/pose_f9.png' },
    { stats: 'Loading...', title: 'Registered teachers', src: '/images/cards/pose_m18.png' },
    { stats: 'Loading...', title: 'Paid students', src: '/images/cards/pose_m1.png' },
    { stats: 'Loading...', title: 'Signed teachers', src: '/images/cards/pose_m35.png' },
    { stats: 'Loading...', title: 'Sessions amount', src: '/images/cards/graph-bar.png' },
    { stats: 'Loading...', title: 'Total volume of fund', src: '/images/cards/graph-bar.png' },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/statistics');
        const result = await response.json();

        if (response.ok) {
          setData([
            { stats: result.studentsCount, title: 'Registered students', src: '/images/cards/pose_f9.png' },
            { stats: result.teachersCount, title: 'Registered teachers', src: '/images/cards/pose_m18.png' },
            { stats: result.uniqueUsersCount, title: 'Paid students', src: '/images/cards/pose_m1.png' },
            { stats: result.signedTeachersCount, title: 'Signed teachers', src: '/images/cards/pose_m35.png' },
            { stats: result.sessionsCount, title: 'Sessions amount', src: '/images/cards/graph-bar.png' },
            { 
              stats: new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(result.totalVolume), 
              title: 'Total volume of fund', 
              src: '/images/cards/graph-bar.png' 
            },
          ]);
        } else {
          console.error('Failed to fetch statistics:', result.error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[0]} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[1]} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[2]} /> 
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[3]} /> 
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[4]} /> 
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[5]} /> 
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CRMDashboard