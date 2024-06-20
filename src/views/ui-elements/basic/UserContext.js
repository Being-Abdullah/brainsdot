import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Define initial user data
const initialUsers = [
  {
    // u_id: '2',
    p_id: '1',
    // role: 'admin',
    categories: ['abc', 'def'],
    regions: ['Region 1', 'Region 2']
  }
];

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (newUser) => {
    // Add the newUser object to the users state
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // You can add other user management functions here, such as updating users, deleting users, etc.

  return <UserContext.Provider value={{ users, addUser }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// // export default UserProvider;
// export { UserContext };
