import React, { useState } from 'react';
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
  useDisclosure
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';

const CreateUserDrawer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  // Function to handle form submission
  const handleSubmit = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Role:', role);
    onClose(); // Close the modal after submitting
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<Icon as={FaUserPlus} />}
        colorScheme="green"
        size="md"
        variant="solid"
        borderRadius="full"
        border="none"
        boxShadow="xl"
        _hover={{ bg: 'green.600' }}
        _active={{ bg: 'green.700', transform: 'scale(0.98)' }}
        transition="background-color 0.2s, transform 0.2s"
        onClick={onOpen}
      >
        Add User
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Please enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Box>

              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  placeholder="Please enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
            <Button variant="outline" mr={3} onClick={onClose}>
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

export default CreateUserDrawer;
