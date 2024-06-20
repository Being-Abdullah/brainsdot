import PropTypes from 'prop-types';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import NavGroup from './NavGroup';

const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const NavContent = ({ navigation }) => {
  const userId = Number(getCookieValue('userId'));

  // Filter out 'region' and 'keywords' if userId is 1
  const filteredNavigation = navigation.map((group) => {
    if (group.children) {
      const filteredChildren = group.children.filter(item => {
        if (userId !== 1) {
          return item.id !== 'region' && item.id !== 'keywords';
        }
        return true;
      });
      return { ...group, children: filteredChildren };
    }
    return group;
  });

  const navItems = filteredNavigation.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={'nav-group-' + item.id} group={item} />;
      default:
        return false;
    }
  });

  console.log('log is', navigation);

  let mainContent = (
    <div className="navbar-content datta-scroll">
      <PerfectScrollbar>
        <ListGroup variant="flush" as="ul" bsPrefix=" " className="nav pcoded-inner-navbar" id="nav-ps-next">
          {navItems}
        </ListGroup>
        {/* <NavCard /> */}
      </PerfectScrollbar>
    </div>
  );

  return <React.Fragment>{mainContent}</React.Fragment>;
};

NavContent.propTypes = {
  navigation: PropTypes.array
};

export default NavContent;
