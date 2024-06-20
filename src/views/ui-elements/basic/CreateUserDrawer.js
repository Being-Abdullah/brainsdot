import React, { useState, useEffect } from 'react';
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
  Select,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  useDisclosure,
  Input,
  useToast
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const CreateUserDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [phoneNumber, setphone] = useState('');
  const [categories, setCategories] = useState([]);
  const [mainbusiness, setmainbusiness] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedmainbusiness, setselectedmainbusiness] = useState([]);
  const toast = useToast();

  useEffect(() => {
    setUsername('');
    setPassword('');
    fetchCategories();
    fetchRegions();
    fetchMainbusiness();
    
  }, []);
  const handleOpen = () => {
    setUsername(''); // Reset username field
    setPassword(''); // Reset password field
    onOpen(); // Open the drawer
  };
  
  const fetchCategories = async () => {
    try {
      const parentUserId = Number(getCookieValue('userId'));
      const url = parentUserId && parentUserId !== 1 ? `http://localhost:3000/category/user/${parentUserId}` : 'http://localhost:3000/category';
      const response = await axios.get(url);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchMainbusiness= async () => {
    try {
      //const parentUserId = Number(getCookieValue('userId'));
      const url = 'http://localhost:3000/main-business';
      const response = await axios.get(url);
      console.log('data is',response.data);
      console.log('data is',username);

      setmainbusiness(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
 

  const fetchRegions = async () => {
    try {
      const parentUserId = Number(getCookieValue('userId'));
      const url = parentUserId && parentUserId !== 1 ? `http://localhost:3000/user-region/user/${parentUserId}` : 'http://localhost:3000/region';
      const response = await axios.get(url);
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setemail('');
    setphone('');
    setSelectedCategories([]);
    setSelectedRegions([]);
    setselectedmainbusiness([]);
  };
  const handlemainbusinessChange  = (e) => {
    const value =  Number(e.target.value);
    if (Array.isArray(value)) {
      console.log('data is',value);
      setselectedmainbusiness(value);
    } else {
      setselectedmainbusiness((prevmainbusiness) =>
        prevmainbusiness.includes(value) ? prevmainbusiness.filter((cat) => cat !== value) : [...prevmainbusiness, value]
      );
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value === 'all' ? categories.map((cat) => cat.id) : Number(e.target.value);
    if (Array.isArray(value)) {
      setSelectedCategories(value);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.includes(value) ? prevCategories.filter((cat) => cat !== value) : [...prevCategories, value]
      );
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.value === 'all' ? regions.map((reg) => reg.id) : Number(e.target.value);
    if (Array.isArray(value)) {
      setSelectedRegions(value);
    } else {
      setSelectedRegions((prevRegions) =>
        prevRegions.includes(value) ? prevRegions.filter((reg) => reg !== value) : [...prevRegions, value]
      );
    }
  };

  const handleSubmit = async () => {
    // if (!username.trim() || !password.trim() || selectedCategories.length === 0 || selectedRegions.length === 0) {
    //   toast({
    //     title: 'Error',
    //     description: 'Please fill in all fields.',
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const email = email.trim();
    

    if (!emailRegex.test(email)) {
        toast({
            title: 'Error',
            description: 'Please enter a valid email address.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
        return;
    }

    const parentUserId = Number(getCookieValue('userId'));
    console.log('parentUserId', parentUserId);

    const newUser = {
      username,
      password,
      parentUserId,
      email,
      phoneNumber,
      mainBusinessId: selectedmainbusiness

       //categoryIds: selectedCategories,
      // regionIds: selectedRegions
    };
    console.log('parentUserId', newUser);

    try {
      // const res = await axios.post(`${backendUrl}/user`, newUser);
      // console.log(res);
      handleClose();
      toast({
        title: 'Success',
        description: 'User created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error',
        description: 'Failed to create user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeCategory = (categoryId) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryId));
  };
  const removemainbusiness = (mainbusinessId) => {
    setselectedmainbusiness(selectedmainbusiness.filter((cat) => cat !== mainbusinessId));
  };

  const removeRegion = (regionId) => {
    setSelectedRegions(selectedRegions.filter((reg) => reg !== regionId));
  };

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
        onClick={handleOpen}
      >
        Add User
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Usernam</FormLabel>
                <Input
                  id="username"
                  placeholder="Please enter username"
                  value={username}
                  
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="password">Passwor</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Please enter password"
                  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Please enter email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="phone">Phone number</FormLabel>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="Please enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setphone(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="mainbusiness">mainbusiness</FormLabel>
                <Select
                  id="mainbusiness"
                  placeholder="Select mainbusiness"
                  onChange={handlemainbusinessChange}
                  value={selectedmainbusiness}
                >
                  
                  {mainbusiness.map((mainbusines) => (
                    <option key={mainbusines.id} value={mainbusines.id}>
                      {mainbusines.businessName}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  id="category"
                  placeholder="Select categories"
                  onChange={handleCategoryChange}
                  value=""
                >
                  <option value="all">All</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="region">Region</FormLabel>
                <Select
                  id="region"
                  placeholder="Select regions"
                  onChange={handleRegionChange}
                  value=""
                >
                  <option value="all">All</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.regionName}
                    </option>
                  ))}
                </Select>
              </Box>
              <Flex wrap="wrap">
                {selectedCategories.map((categoryId) => (
                  <Tag key={categoryId} size="lg" borderRadius="full" variant="solid" colorScheme="blue" mr={2} mb={2}>
                    <TagLabel>{categories.find((cat) => cat.id === categoryId)?.categoryName}</TagLabel>
                    <TagCloseButton onClick={() => removeCategory(categoryId)} />
                  </Tag>
                ))}
                {selectedRegions.map((regionId) => (
                  <Tag key={regionId} size="lg" borderRadius="full" variant="solid" colorScheme="green" mr={2} mb={2}>
                    <TagLabel>{regions.find((reg) => reg.id === regionId)?.regionName}</TagLabel>
                    <TagCloseButton onClick={() => removeRegion(regionId)} />
                  </Tag>
                ))}
                {selectedmainbusiness.map((mainbusinessId) => (
                  <Tag key={mainbusinessId} size="lg" borderRadius="full" variant="solid" colorScheme="green" mr={2} mb={2}>
                    <TagLabel>{regions.find((reg) => reg.id === regionId)?.regionName}</TagLabel>
                    <TagCloseButton onClick={() => removemainbusiness(mainbusinessId)} />
                  </Tag>
                ))}
                
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Cancel</Button>
            <Button colorScheme="green" onClick={handleSubmit} ml={3}>
              Create User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserDrawer;
