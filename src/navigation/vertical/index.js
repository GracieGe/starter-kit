const navigation = (role) => {
  const baseNavigation = [
    {
      title: 'Statistics',
      path: '/statistics-information',
    },
    {
      title: 'Sessions',
      path: '/sessions-management',
    },
    {
      title: 'Students',
      path: '/students-management',
    },
    {
      title: 'Teachers',
      path: '/teachers-management',
    }
  ];

  const superAdminNavigation = [
    {
      title: 'Administrators',
      path: '/administrators',
    },
    {
      title: 'Update Information',
      children: [
        {
          title: 'Courses',
          path: '/update-information/courses'
        },
      ]
    }
  ];

  if (role === 'Super Admin') {
    return [...baseNavigation, ...superAdminNavigation];
  }

  return baseNavigation;
}

export default navigation;