const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const parentUserId = Number(getCookieValue('userId'));
console.log('id',parentUserId);
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
          url: '/dashboard'
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
      id: 'others',
      title: 'Others',
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
          id: 'leads-data',
          title: 'Leads-data',
          type: 'item',
          icon: 'feather icon-target',
          url: '/leads/data'
        },
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          icon: 'feather icon-user',
          url: '/users'
        }
      ]
    }
  ]
};

if (parentUserId == 1) {
  menuItems.items.find(group => group.id === 'others').children.push(
    {
      id: 'region',
      title: 'Region',
      type: 'item',
      icon: 'feather icon-map',
      url: '/region'
    },
    {
      id: 'keywords',
      title: 'Keywords',
      type: 'item',
      icon: 'feather icon-globe',
      url: '/keywords'
    }
  );
}

export default menuItems;
