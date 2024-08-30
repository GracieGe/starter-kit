// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import toast from 'react-hot-toast'
import Router from 'next/router'

const initialData = {
  fullName: '', 
  phoneNumber: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: ''
}

const CreateAdminForm = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [userInput, setUserInput] = useState('yes')
  const [formData, setFormData] = useState(initialData)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)

  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  })

  // ** Hooks

  const handleClose = () => setOpen(false)

  const handleConfirmation = value => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const [notUnique, setNotUnique] = useState(false)

  const OpenNotUniqueDialog = () => {
    setNotUnique(true)
  }

  const CloseNotUniqueDialog = () => {
    setNotUnique(false)
  }

  const addDataToDatabase = async () => {
    const phoneNumberNew = watch('phoneNumber')
    const emailNew = watch('email')
    const fullNameNew = watch('fullName')
    const passwordNew = watch('password')
    const roleNew = watch('role')

    try {
      const body = { phoneNumberNew, fullNameNew, emailNew, passwordNew, roleNew }

      const response = await fetch('/api/createAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const addResponse = await response.json()
      if (addResponse == 0) {
        OpenNotUniqueDialog()

        return
      }
    } catch (error) {
      console.error(error)

      return
    }

    toast.success('Form Submitted')
    await Router.push('/administrators')
  }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm({ initialData })

  const OnSubmit = async event => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    try {
      await addDataToDatabase()
    } catch (error) {
      console.error('Error adding data to database:', error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Admin' />
          <form name='create_admin' onSubmit={handleSubmit(OnSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='fullName'
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label='Full Name'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.fullName)}
                          aria-describedby='errorFullName'
                        />
                      )}
                    />
                    {errors.fullName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorFullName'>
                        This field is required.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='phoneNumber'
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^[0-9]+$/
                        }
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label='Phone Number'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.phoneNumber)}
                          aria-describedby='errorPhoneNumber'
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorPhoneNumber'>
                        This field is required. Phone number must only contain digits.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='email'
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^(\w+(\_|\-|\.)*)+@(\w+(\-)?)+(\.\w{2,})+$/
                        }
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label='Email'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          aria-describedby='errorEmail'
                        />
                      )}
                    />
                    {errors.email && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorEmail'>
                        This field is required. Please enter a valid email address.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='role'
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          select
                          label='Role'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.role)}
                          aria-describedby='errorRole'
                        >
                          <MenuItem value='Standard Admin'>Standard Admin</MenuItem>
                          <MenuItem value='Super Admin'>Super Admin</MenuItem>
                        </TextField>
                      )}
                    />
                    {errors.role && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorRole'>
                        This field is required.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                    <Controller
                      name='password'
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{9,}$/
                        }
                      }}
                      render={({ field: { value, onChange } }) => (
                        <OutlinedInput
                          label='Password'
                          value={value || ''}
                          id='errorPassword'
                          onChange={onChange}
                          error={Boolean(errors.password)}
                          type={values.showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                              >
                                <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.password && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorPassword'>
                        This field is required. Password must be at least 9 characters long and contain an uppercase
                        letter, lowercase letter, digit (0-9) and special character (!@#$%^&*_)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='form-layouts-separator-password-2'>Confirm Password</InputLabel>
                    <Controller
                      name='confirmPassword'
                      control={control}
                      rules={{
                        required: true,
                        validate: value => value === watch('password')
                      }}
                      render={({ field: { value, onChange } }) => (
                        <OutlinedInput
                          value={value || ''}
                          label='Confirm Password'
                          id='errorConfirmPassword'
                          onChange={onChange}
                          error={Boolean(errors.confirmPassword)}
                          type={values.showConfirmPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                                onClick={handleClickShowConfirmPassword}
                              >
                                <Icon icon={values.showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorConfirmPassword'>
                        This field is required. Passwords do not match.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    size='large'
                    style={{ backgroundColor: '#326eff', borderColor: '#326eff', opacity: 1 }}
                    type='submit'
                    variant='contained'
                    sx={{ mr: 4 }}
                  >
                    Submit
                  </Button>
                  <Button
                    size='large'
                    variant='contained'
                    style={{ backgroundColor: '#3c3c3c', borderColor: '#3c3c3c', opacity: 1 }}
                    href='/administrators'
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
        <Dialog
          maxWidth='md'
          scroll='body'
          open={notUnique}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle
            sx={{
              textAlign: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Typography variant='h5' component='span'>
              {`Error Creating Account`}
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(5)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Typography align='center' variant='body1' color='#c96363'>
              Phone number or email address already exists.
            </Typography>
            <Typography align='center' variant='body1'>
              Please try again.
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
            <Button
              size='large'
              variant='contained'
              style={{ backgroundColor: '#c96363', borderColor: '#c96363', opacity: 1 }}
              onClick={CloseNotUniqueDialog}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default CreateAdminForm