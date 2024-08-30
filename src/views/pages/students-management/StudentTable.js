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

function StudentTable({ students = [] }) {
  // sort students
  const sortedStudents = [...students].sort((a, b) => a.studentId - b.studentId)

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
  const [filteredData, setFilteredData] = useState(sortedStudents);

  const handleSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = students.filter(row => {
      return Object.keys(row).some(field => {
        const value = row[field];
        
        return value !== null && value !== undefined && searchRegex.test(value.toString());
      });
    });
    if (searchValue.length) {
      setFilteredData([...filteredRows].sort((a, b) => a.studentId - b.studentId))
    } else {
      setFilteredData([...sortedStudents])
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

  const columns = [
    {
      flex: 0.08,
      minWidth: 10,
      field: 'studentId',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography variant='body1' noWrap>
          {row.studentId}
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
      flex: 0.1,
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
      field: 'grade',
      minWidth: 150,
      headerName: 'Grade',
      renderCell: ({ row }) => (
        <Tooltip title={row.grade}>
          <Typography variant='body1' noWrap>
            {row.grade}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      field: 'totalAmount',
      minWidth: 150,
      headerName: 'Paid Amount',
      renderCell: ({ row }) => (
        <Tooltip title={row.totalAmount}>
          <Typography variant='body1' noWrap>
            {row.totalAmount}
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
          {row.active ? 'Y' : 'N'}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
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
                setDialogTitle(row.active ? 'Deactivation' : 'Reactivation');
                setDialogWord(row.active ? 'Deactivate' : 'Reactivate');
                setDialogWordLower(row.active ? 'deactivate' : 'reactivate');
                setDialogColor(row.active ? '#c96363' : '#50d2be');
                setSelectedActivationID(row.studentId);
                setSelectedActivationStatus(row.active);
              }}
            >
              {row.active ? 'Deactivate' : 'Reactivate'}
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
            Student List
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box className='demo-space-x' display='flex' justifyContent='flex-end'>
            <StyledButton
              size='large'
              disabled={rowsSelected.length === 0}
              variant='contained'
              onClick={e => {
                e.preventDefault();
                handleClickOpenRemove();
              }}
            >
              - Remove Selected Students
            </StyledButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              rows={filteredData}
              columns={columns}
              getRowId={row => row.studentId}
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
            Are you sure you would like to {dialogWordLower} this student?
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
              onClick={handleClose}
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
            Are you sure you would like to remove the selected student(s)?
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

export default StudentTable;