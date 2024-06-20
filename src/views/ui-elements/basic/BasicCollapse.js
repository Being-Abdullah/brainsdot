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
  Stack,
  Flex,
  useDisclosure,
  Input,
  useToast,
  Select
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const BasicCollapse = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [keywords, setKeywords] = useState([{ keyword: '', exclude: '' }]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/category`);
        if (!response.data || response.status !== 200) {
          throw new Error('Failed to fetch categories');
        }
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch categories.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-left',
        });
      }
    };

    fetchCategories();
  }, [toast]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedCategoryId(null);
    setKeywords([{ keyword: '', exclude: '' }]);
  };

  const handleKeywordChange = (index, key, value) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index][key] = value;
    setKeywords(updatedKeywords);
  };

  const addKeywordField = () => {
    setKeywords([...keywords, { keyword: '', exclude: '' }]);
  };

  const removeKeywordField = (index) => {
    const updatedKeywords = [...keywords];
    updatedKeywords.splice(index, 1);
    setKeywords(updatedKeywords);
  };

  const handleSubmit = async () => {
    if (!selectedCategoryId) {
      toast({
        title: 'Error',
        description: 'Please select a category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    try {
      const keywordData = keywords.map(kw => ({
        keywordData: kw.keyword,
        exclude: kw.exclude,
        categoryId: selectedCategoryId
      }));

      const response = await axios.post(`${backendUrl}/keyword`, keywordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error('Failed to create keywords');
      }

      handleClose();
      toast({
        title: 'Success',
        description: 'Keywords added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    } catch (error) {
      console.error('Error creating keywords:', error);
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  };

  return (
    <>
      <Button
        leftIcon={<Icon as={FaUserPlus} />}
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
        Add Keywords
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="600px">
          <ModalHeader>Add Keywords</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  id="category"
                  placeholder="Select category"
                  value={selectedCategoryId || ''}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Select>
              </Box>
              {keywords.map((keyword, index) => (
                <Flex key={index} mb="8px" alignItems="center">
                  <Input
                    placeholder="Enter keyword"
                    value={keyword.keyword}
                    onChange={(e) => handleKeywordChange(index, 'keyword', e.target.value)}
                    mr="8px"
                  />
                  <Input
                    placeholder="Enter exclude"
                    value={keyword.exclude}
                    onChange={(e) => handleKeywordChange(index, 'exclude', e.target.value)}
                    mr="8px"
                  />
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeKeywordField(index)}
                    flexShrink={0}
                  >
                    Remove
                  </Button>
                </Flex>
              ))}
              <Button size="sm" colorScheme="blue" onClick={addKeywordField}>
                Add Keyword
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Cancel</Button>
            <Button colorScheme="green" onClick={handleSubmit} ml={3}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BasicCollapse;
