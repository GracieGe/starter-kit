const navigation = () => {
  return [
    {
      title: 'Statistics Information',
      path: '/statistics-information',
    },
    {
      title: 'Sessions Management',
      path: '/sessions-management',
    },
    {
      title: 'Students Management',
      path: '/students-management',
    },
    {
      title: 'Teachers Management',
      path: '/teachers-management',
    },
    {
      title: 'Administrators',
      path: '/administrators',
    },
    {
      title: 'Update Information',
      children: [
        {
          title: 'Courses Information',
          path: '/update-information/courses'
        },
      ]
    },
  ]
}

export default navigation
