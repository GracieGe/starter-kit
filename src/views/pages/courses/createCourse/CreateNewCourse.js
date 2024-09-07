// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

import toast from 'react-hot-toast'
import Router from 'next/router'

const initialData = {
  courseName: '', 
  grade: '',
  description: '',
  price: ''
}

const CreateCourseForm = () => {
  // ** State
  const [formData, setFormData] = useState(initialData)

  // ** Hooks
  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const addDataToDatabase = async () => {
    const courseNameNew = watch('courseName')
    const gradeNew = watch('grade')
    const descriptionNew = watch('description')
    const priceNew = watch('price')

    try {
      const body = { courseNameNew, gradeNew, descriptionNew, priceNew }

      const response = await fetch('/api/web-api/createCourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        toast.success('Form Submitted')
        await Router.push('/update-information/courses')
      } else {
        toast.error('Failed to submit form')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while submitting the form')
    }
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
          <CardHeader title='Create Course' />
          <form name='create_course' onSubmit={handleSubmit(OnSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='courseName'
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label='Course Name'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.courseName)}
                          aria-describedby='errorCourseName'
                        />
                      )}
                    />
                    {errors.courseName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorCourseName'>
                        This field is required.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='grade'
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label='Grade'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.grade)}
                          aria-describedby='errorGrade'
                        />
                      )}
                    />
                    {errors.grade && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorGrade'>
                        This field is required.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='description'
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label='Course Description'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.description)}
                          aria-describedby='errorDescription'
                        />
                      )}
                    />
                    {errors.description && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorDescription'>
                        This field is required.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='price'
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label='Price per Hour'
                          value={value || ''}
                          onChange={onChange}
                          error={Boolean(errors.price)}
                          aria-describedby='errorPrice'
                        />
                      )}
                    />
                    {errors.price && (
                      <FormHelperText sx={{ color: 'error.main' }} id='errorPrice'>
                        This field is required.
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
                    href='/update-information/courses'
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateCourseForm