import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import toast from 'react-hot-toast';
import Router from 'next/router';

const EditCourseForm = ({ courseId }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const fetchCourseData = async () => {
        try {
          const response = await fetch(`/api/getCourse?courseId=${courseId}`);
          const data = await response.json();
          
          setValue('courseName', data.courseName);
          setValue('grade', data.grade);
          setValue('description', data.description);
          setValue('price', data.price);
          
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch course data:', error);
        }
      };
      
      fetchCourseData();
    }
  }, [courseId, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`/api/updateCourse`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, ...formData })
      });

      if (response.ok) {
        toast.success('Course updated successfully');
        Router.push('/update-information/courses');
      } else {
        toast.error('Failed to update course');
      }
    } catch (error) {
      console.error('Failed to update course:', error);
      toast.error('An error occurred while updating the course');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Edit Course" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name="courseName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          label="Course Name"
                          {...field}
                          error={Boolean(errors.courseName)}
                        />
                      )}
                    />
                    {errors.courseName && <FormHelperText>This field is required</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name="grade"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          label="Grade"
                          {...field}
                          error={Boolean(errors.grade)}
                        />
                      )}
                    />
                    {errors.grade && <FormHelperText>This field is required</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <TextField
                          label="Description"
                          {...field}
                          error={Boolean(errors.description)}
                        />
                      )}
                    />
                    {errors.description && <FormHelperText>This field is required</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name="price"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          label="Price per Hour"
                          {...field}
                          error={Boolean(errors.price)}
                        />
                      )}
                    />
                    {errors.price && <FormHelperText>This field is required</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditCourseForm;