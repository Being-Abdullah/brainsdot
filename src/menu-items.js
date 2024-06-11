const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Dashboard Section',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'Categories Section',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Category',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'lpg',
              title: 'LPG',
              type: 'item',
              url: '/'
            },
            {
              id: 'indus',
              title: 'IND',
              type: 'item',
              url: '/'
            },
            {
              id: 'gulf',
              title: 'Gulf Gas',
              type: 'item',
              url: '/'
            }
          ]
        }
      ]
    },
    {
      id: 'others', // New group item for categories
      title: 'Others', // Title for the dropdown
      type: 'group',
      icon: 'feather icon-folder',
      children: [
        {
          id: 'leads',
          title: 'Leads',
          type: 'item',
          icon: 'feather icon-target',
          url: '/leads'
        },
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          icon: 'feather icon-user',
          url: '/users'
        },
        {
          id: 'region',
          title: 'Region',
          type: 'item',
          icon: 'feather icon-map',
          url: '/region'
        }
        // {
        //   id: 'countries',
        //   title: 'Countries',
        //   type: 'item',
        //   icon: 'feather icon-globe',
        //   url: '/countries'
        // }
      ]
    }
  ]
};

export default menuItems;
