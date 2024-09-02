// ** React Imports
import { useState } from 'react';

// ** Next Import
import Link from 'next/link';

// ** MUI Imports
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';

// ** Custom Components Imports
import QuickSearchToolbar from 'src/views/pages/administrators/QuickSearchToolbar';

// ** Vars
const teacherDialog = {
  true: { letter: 'Y', verb: 'Deactivate', noun: 'Deactivation', verbLower: 'deactivate', color: '#c96363' },
  false: { letter: 'N', verb: 'Reactivate', noun: 'Reactivation', verbLower: 'reactivate', color: '#50d2be' }
};

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

function TeacherTable({ teachers = [] }) {
  // sort teachers
  const sortedTeachers = [...teachers].sort((a, b) => a.teacherId - b.teacherId)

  // ** State
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Deactivation');
  const [dialogWord, setDialogWord] = useState('Deactivate');
  const [dialogWordLower, setDialogWordLower] = useState('deactivate');
  const [dialogColor, setDialogColor] = useState('');
  const [selectedActivationID, setSelectedActivationID] = useState(1);
  const [selectedActivationStatus, setSelectedActivationStatus] = useState(true);

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [rowsSelected, setRowsSelected] = useState([]);
  const [openRemove, setOpenRemove] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(sortedTeachers);

  const handleSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = teachers.filter(row => {
      return Object.keys(row).some(field => {
        const value = row[field];
        
        return value !== null && value !== undefined && searchRegex.test(value.toString());
      });
    });
    if (searchValue.length) {
      setFilteredData([...filteredRows].sort((a, b) => a.teacherId - b.teacherId))
    } else {
      setFilteredData([...sortedTeachers])
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClickOpenRemove = () => setOpenRemove(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleSubmitActivation = async () => {
    const id = selectedActivationID;
    const newStatus = !selectedActivationStatus;

    try {
      const body = { teacherId: id, newStatus };
      
      const response = await fetch('/api/teacherActivation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setFilteredData(
          filteredData.map(teacher =>
            teacher.teacherId === id ? { ...teacher, active: newStatus } : teacher
          )
        );
        handleClose();
      } else {
        console.error('Failed to update teacher status');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      flex: 0.07,
      minWidth: 10,
      field: 'teacherId',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography variant='body1' noWrap>
          {row.teacherId}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'fullName',
      headerName: 'Fullname',
      renderCell: ({ row }) => (
        <Tooltip title={row.fullName}>
          <Typography variant='body1' noWrap>
            {row.fullName}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.13,
      minWidth: 50,
      field: 'phoneNumber',
      headerName: 'Phone Number',
      renderCell: ({ row }) => (
        <Tooltip title={row.phoneNumber}>
          <Typography variant='body1' noWrap>
            {row.phoneNumber}
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
      field: 'teachingYears',
      minWidth: 150,
      headerName: 'Teaching Years',
      renderCell: ({ row }) => (
        <Tooltip title={row.teachingYears}>
          <Typography variant='body1' noWrap>
            {row.teachingYears}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      field: 'status',
      minWidth: 150,
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Tooltip title={row.status}>
          <Typography variant='body1' noWrap>
            {row.status}
          </Typography>
        </Tooltip>
      )
    },
    {
        flex: 0.1,
        field: 'rating',
        minWidth: 100,
        headerName: 'Evaluation',
        renderCell: ({ row }) => (
          <Tooltip title={row.rating}>
            <Typography variant='body1' noWrap>
              {row.rating}
            </Typography>
          </Tooltip>
        )
      },
    {
      flex: 0.1,
      minWidth: 10,
      field: 'active',
      headerName: 'Active',
      renderCell: ({ row }) => (
        <Typography variant='body1' noWrap>
          {teacherDialog[row.active].letter}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'action',
      headerName: 'Action',
      renderCell: ({ row }) => {
          return (
            <Typography
              href='/'
              variant='body2'
              component={Link}
              sx={{ color: 'primary.main', textDecoration: 'none' }}
              onClick={e => {
                e.preventDefault();
                handleClickOpen();
                setDialogTitle(teacherDialog[row.active].noun);
                setDialogWord(teacherDialog[row.active].verb);
                setDialogWordLower(teacherDialog[row.active].verbLower);
                setDialogColor(teacherDialog[row.active].color);
                setSelectedActivationID(row.teacherId);
                setSelectedActivationStatus(row.active);
              }}
            >
              {teacherDialog[row.active].verb}
            </Typography>
          );
      }
    }
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Typography variant='h5' style={{ paddingTop: '3%' }}>
            Teacher List
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              rows={filteredData}
              columns={columns}
              getRowId={row => row.teacherId}
              checkboxSelection
              disableVirtualization
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={newSelectionModel => {
                setRowsSelected(newSelectionModel);
              }}
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
      <Dialog maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span'>
            {`Confirm ${dialogTitle}`}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Typography align='center' variant='body1' color={dialogColor}>
            Are you sure you would like to {dialogWordLower} this teacher?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button
              size='large'
              variant='outlined'
              style={{ backgroundColor: '#3c3c3c', borderColor: '#3c3c3c', opacity: 0.4 }}
              onClick={handleClose}
            >
              <Typography style={{ color: '#ffffff' }}>Cancel</Typography>
            </Button>
            <Button
              size='large'
              style={{ backgroundColor: dialogColor, borderColor: dialogColor, opacity: 1 }}
              variant='contained'
              onClick={handleSubmitActivation}
            >
              Yes, {dialogWord}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog maxWidth='md' scroll='body' onClose={handleCloseRemove} open={openRemove}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span'>
            {`Confirm Removal`}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Typography align='center' variant='body1' color='#c96363'>
            Are you sure you would like to remove the selected teacher(s)?
            <br></br>This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button
              size='large'
              variant='outlined'
              style={{ backgroundColor: '#3c3c3c', borderColor: '#3c3c3c', opacity: 0.4 }}
              onClick={handleCloseRemove}
            >
              <Typography style={{ color: '#ffffff' }}>Cancel</Typography>
            </Button>
            <Button
              size='large'
              type='submit'
              variant='contained'
              style={{ backgroundColor: '#c96363', borderColor: '#c96363', opacity: 1 }}
              onClick={handleCloseRemove}
            >
              Yes, Remove
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TeacherTable;