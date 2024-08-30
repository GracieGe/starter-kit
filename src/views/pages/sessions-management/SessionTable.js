// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';

// ** Custom Components Imports
import QuickSearchToolbar from 'src/views/pages/administrators/QuickSearchToolbar';

// ** Utils Import
const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

// use styled API create styled button
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff6c37', // Default background color
  color: 'white', // Default text color
  '&.Mui-disabled': {
    backgroundColor: '#3C3C3C40', // Change background color when disabled
    color: '#FFFFFF' // Change text color when disabled
  },
  transition: 'box-shadow 0.3s', // Add transition for smooth hover effect
  '&:hover': {
    backgroundColor: '#ff6c37', // Change background color on hover
    color: 'white', // Change text color on hover
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)' // Elevate on hover
  }
}));

function SessionTable({ sessions = [] }) {
  // sort sessions
  const sortedSessions = [...sessions].sort((a, b) => a.sessionId - b.sessionId)

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(sortedSessions);

  const handleSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = sessions.filter(row => {
      return Object.keys(row).some(field => {
        const value = row[field];
        
        return value !== null && value !== undefined && searchRegex.test(value.toString());
      });
    });
    if (searchValue.length) {
      setFilteredData([...filteredRows].sort((a, b) => a.sessionId - b.sessionId))
    } else {
      setFilteredData([...sortedSessions])
    }
  };

  const columns = [
    {
      flex: 0.1,
      minWidth: 10,
      field: 'sessionId',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography variant='body1' noWrap>
          {row.sessionId}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'studentName',
      headerName: 'Student',
      renderCell: ({ row }) => (
        <Tooltip title={row.studentName}>
          <Typography variant='body1' noWrap>
            {row.studentName}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'teacherName',
      headerName: 'Teacher',
      renderCell: ({ row }) => (
        <Tooltip title={row.teacherName}>
          <Typography variant='body1' noWrap>
            {row.teacherName}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'courseName',
      headerName: 'Course',
      renderCell: ({ row }) => (
        <Tooltip title={row.courseName}>
          <Typography variant='body1' noWrap>
            {row.courseName}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      field: 'location',
      minWidth: 150,
      headerName: 'Location',
      renderCell: ({ row }) => (
        <Tooltip title={row.location}>
          <Typography variant='body1' noWrap>
            {row.location}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      field: 'sessionTime',
      minWidth: 150,
      headerName: 'Time',
      renderCell: ({ row }) => (
        <Tooltip title={row.sessionTime}>
          <Typography variant='body1' noWrap>
            {row.sessionTime}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      field: 'recording_student',
      minWidth: 100,
      headerName: 'Student Recording',
      renderCell: ({ row }) => {
        const recording = row.recording_student ?? 'N/A'

        return (
          <Tooltip title={recording}>
            <Typography variant='body1' noWrap>
              {recording}
            </Typography>
          </Tooltip>
        );
      }
    },
    {
      flex: 0.1,
      field: 'recording_teacher',
      minWidth: 100,
      headerName: 'Teacher Recording',
      renderCell: ({ row }) => {
        const recording = row.recording_teacher ?? 'N/A'

        return (
          <Tooltip title={recording}>
            <Typography variant='body1' noWrap>
              {recording}
            </Typography>
          </Tooltip>
        );
      }
    },
    {
      flex: 0.1,
      field: 'status',
      minWidth: 100,
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Tooltip title={row.status}>
          <Typography variant='body1' noWrap>
            {row.status}
          </Typography>
        </Tooltip>
      )
    },
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Typography variant='h5' style={{ paddingTop: '3%' }}>
            Session List
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              rows={filteredData}
              columns={columns}
              getRowId={row => row.sessionId}
              disableVirtualization
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              slots={{ toolbar: QuickSearchToolbar }}
              slotProps={{
                baseButton: {
                  variant: 'outlined'
                },
                toolbar: {
                  value: searchText,
                  clearSearch: () => handleSearch(''),
                  onChange: event => handleSearch(event.target.value)
                }
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default SessionTable;