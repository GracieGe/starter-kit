const navigation = (role) => {
  const baseNavigation = [
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
          title: 'Courses Information',
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