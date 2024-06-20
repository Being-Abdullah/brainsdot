import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  FormLabel,
  Input,
  Select,
  Stack,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const AddRole = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const toast = useToast();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setUsername('');
    setRole('user');
  };

  const handleSubmit = () => {
    if (username.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please enter a username.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    // Assuming addUser is a function to add user, passed as prop
    addUser({ username, role });

    // Close the modal after adding user
    onClose();

    // Optionally, reset input fields
    setUsername('');
    setRole('user');

    // Show success message
    toast({
      title: 'User added',
      description: `User '${username}' added successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-left',
    });
  };

  return (
    <>
      <Button
        leftIcon={<Icon as={FaPlus} />}
        colorScheme="blue"
        size="md"
        variant="solid"
        borderRadius="full"
        border="none"
        boxShadow="xl"
        _hover={{ bg: 'blue.600' }}
        _active={{ bg: 'blue.700', transform: 'scale(0.98)' }}
        transition="background-color 0.2s, transform 0.2s"
        onClick={onOpen}
      >
        Add Role
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Please enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Box>

              <Box>
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Add User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
AddRole.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
};
export default AddRole;
