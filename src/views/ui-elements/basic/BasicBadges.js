import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, HStack } from '@chakra-ui/react';
import CreateUserDrawer from './CreateUserDrawer';
import CreateCategory from './CreateCategory';
import EditUserDrawer from './EditUserDrawer';

const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const BasicBadges = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const parentUserId = Number(getCookieValue('userId'));

  // Calculate the indices for the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / itemsPerPage) || 1;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/${parentUserId}/descendants`);
      setUsers(response.data); // Assuming response.data is an array of users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Container maxW="container.xl">
      <Box boxShadow="md" p="6" rounded="md" bg="white">
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Text fontSize="2xl" fontWeight="bold">
            Recent Users
          </Text>
          <HStack spacing="2">
            <CreateUserDrawer />
            {parentUserId === 1 ? <CreateCategory /> : null}
            <EditUserDrawer />
          </HStack>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>User Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers.map((user, index) => (
              <Tr key={index}>
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* Pagination Controls */}
        <Flex justifyContent="center" mt="4">
          <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} isDisabled={currentPage === 1} mr={2}>
            Previous
          </Button>
          <Text alignSelf="center">{`Page ${currentPage} of ${totalPages}`}</Text>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
            ml={2}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default BasicBadges;
