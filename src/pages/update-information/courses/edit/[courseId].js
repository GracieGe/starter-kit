import { useRouter } from 'next/router';
import EditCourseForm from 'src/views/pages/courses/editCourse/EditCourseForm';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from 'src/@core/components/icon';
import Link from 'next/link';

const EditCoursePage = () => {
  const router = useRouter();
  const { courseId } = router.query;

  return (
    <>
      <Typography variant='p'>
        <IconButton>
          <Icon icon='mdi:home-outline' />
        </IconButton>
        / <Link href='/update-information/courses'>Courses</Link> /{' '}
        <Link href={`/update-information/courses/edit/${courseId}`}>Edit Course</Link>
      </Typography>

      {courseId ? (
        <EditCourseForm courseId={courseId} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EditCoursePage;