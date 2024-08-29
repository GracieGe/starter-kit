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

function StudentTable({ admins = [] }) {
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
  const [filteredData, setFilteredData] = useState(admins);

  const handleSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = admins.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData(admins);
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
      flex: 0.1,
      minWidth: 10,
      field: 'adminId',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography variant='body1' noWrap>
          {row.adminId}
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
      minWidth: 250,
      field: 'email',
      headerName: 'Email Address',
      renderCell: ({ row }) => (
        <Tooltip title={row.email}>
          <Typography variant='body1' noWrap>
            {row.email}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      field: 'role',
      minWidth: 150,
      headerName: 'Role',
      renderCell: ({ row }) => (
        <Tooltip title={row.role}>
          <Typography variant='body1' noWrap>
            {row.role}
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
                setSelectedActivationID(row.adminId);
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
            <Button
              size='large'
              variant='contained'
              style={{ backgroundColor: '#326eff', borderColor: '#326eff', opacity: 1 }}
              href='/administrators/create'
            >
              + Create New Admin
            </Button>
            <StyledButton
              size='large'
              disabled={rowsSelected.length === 0}
              variant='contained'
              onClick={e => {
                e.preventDefault();
                handleClickOpenRemove();
              }}
            >
              - Remove Selected Admins
            </StyledButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              rows={filteredData}
              columns={columns}
              getRowId={row => row.adminId}
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
            Are you sure you would like to {dialogWordLower} this admin?
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
            Are you sure you would like to remove the selected admin(s)?
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