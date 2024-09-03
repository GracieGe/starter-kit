// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled component for the image
const Img = styled('img')({
  right: 7,
  bottom: 0,
  height: 177,
  position: 'absolute'
})

const CardStatsCharacter = ({ data }) => {
  // ** Vars
  const { title, chipText, src, stats, trendNumber, trend = 'positive', chipColor = 'primary' } = data
  const imageSx = title === 'Sessions amount' || title === 'Total volume of fund'? { height: '100px', width: '100px' } : {}

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Typography sx={{ mb: 6.5, fontWeight: 600 }}>{title}</Typography>
        <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Typography variant='h5' sx={{ mr: 1.5 }}>
            {stats}
          </Typography>
        </Box>
        <CustomChip
          sx={{ 
            height: 20, 
            fontWeight: 500, 
            fontSize: '0.75rem', 
            visibility: 'hidden',
            '& .MuiChip-label': { lineHeight: '1.25rem' } 
          }}
        />
        <Img src={src} alt={title} style={imageSx}/>
      </CardContent>
    </Card>
  )
}

export default CardStatsCharacter
