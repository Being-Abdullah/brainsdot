// import React, { useState } from 'react';
// import {
//   Button,
//   Icon,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Box,
//   FormLabel,
//   Stack,
//   Flex,
//   useDisclosure,
//   Input,
//   useToast,
//   Select // Import Select from Chakra UI
// } from '@chakra-ui/react';
// import { FaUserPlus } from 'react-icons/fa';

// const CreateCategory = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [category, setCategory] = useState('');
//   const [keywords, setKeywords] = useState([{ keyword: '', exclude: '' }]);
//   const [selectedParentId, setSelectedParentId] = useState('');
//   const toast = useToast();
//   const parentIds = [
//     { id: '1', name: 'LPG' },
//     { id: '2', name: 'Gulf Gas' },
//     { id: '3', name: 'IND' }
//   ];
//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   const resetForm = () => {
//     setCategory('');
//     setKeywords([{ keyword: '', exclude: '' }]);
//     setSelectedParentId('');
//   };

//   const handleKeywordChange = (index, key, value) => {
//     const updatedKeywords = [...keywords];
//     updatedKeywords[index][key] = value;
//     setKeywords(updatedKeywords);
//   };

//   const addKeywordField = () => {
//     setKeywords([...keywords, { keyword: '', exclude: '' }]);
//   };

//   const removeKeywordField = (index) => {
//     const updatedKeywords = [...keywords];
//     updatedKeywords.splice(index, 1);
//     setKeywords(updatedKeywords);
//   };

//   const handleSubmit = () => {
//     // Check if required fields are filled
//     if (!category.trim() || !selectedParentId) {
//       toast({
//         title: 'Error',
//         description: 'Please enter a category and select a parent ID.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }

//     // Create a new category object including keywords
//     const newCategory = {
//       category: category,
//       parent_id: selectedParentId,
//       keywords: keywords.map((kw) => ({ keyword: kw.keyword, exclude: kw.exclude }))
//     };

//     console.log('Added Category:', newCategory);
//     handleClose();

//     toast({
//       title: 'Success',
//       description: 'Category created successfully.',
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   return (
//     <>
//       <Button
//         leftIcon={<Icon as={FaUserPlus} />}
//         colorScheme="blue"
//         size="md"
//         variant="solid"
//         borderRadius="full"
//         border="none"
//         boxShadow="xl"
//         _hover={{ bg: 'blue.600' }}
//         _active={{ bg: 'blue.700', transform: 'scale(0.98)' }}
//         transition="background-color 0.2s, transform 0.2s"
//         onClick={onOpen}
//       >
//         Add Category
//       </Button>
//       <Modal isOpen={isOpen} onClose={handleClose}>
//         <ModalOverlay />
//         <ModalContent maxW="600px"> {/* Adjusted width */}
//           <ModalHeader>Create a new category</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Stack spacing="24px">
//               <Box>
//                 <FormLabel htmlFor="category">Category</FormLabel>
//                 <Input
//                   id="category"
//                   placeholder="Enter category"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </Box>
//               {/* Parent ID Dropdown */}
//               <Box>
//                 <FormLabel htmlFor="parent_id">Parent ID</FormLabel>
//                 <Select
//                   id="parent_id"
//                   placeholder="Select parent ID"
//                   value={selectedParentId}
//                   onChange={(e) => setSelectedParentId(e.target.value)}
//                 >
//                   {parentIds.map((parent) => (
//                     <option key={parent.id} value={parent.id}>
//                       {parent.name}
//                     </option>
//                   ))}
//                 </Select>
//               </Box>
//               {/* Keywords Input Fields */}
//               {keywords.map((keyword, index) => (
//                 <Flex key={index} mb="8px" alignItems="center">
//                   <Input
//                     placeholder="Enter keyword"
//                     value={keyword.keyword}
//                     onChange={(e) => handleKeywordChange(index, 'keyword', e.target.value)}
//                     mr="8px"
//                   />
//                   <Input
//                     placeholder="Enter exclude"
//                     value={keyword.exclude}
//                     onChange={(e) => handleKeywordChange(index, 'exclude', e.target.value)}
//                     mr="8px"
//                   />
//                   <Button
//                     size="sm"
//                     colorScheme="red"
//                     onClick={() => removeKeywordField(index)}
//                     flexShrink={0} // Ensure button width does not shrink
//                   >
//                     Remove
//                   </Button>
//                 </Flex>
//               ))}
//               {/* Add Keyword Button */}
//               <Button size="sm" colorScheme="blue" onClick={addKeywordField}>
//                 Add Keyword
//               </Button>
//             </Stack>
//           </ModalBody>

//           <ModalFooter>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button colorScheme="green" onClick={handleSubmit} ml={3}>
//               Create Category
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default CreateCategory;


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
  // Flex,
  useDisclosure,
  Input,
  useToast,
  Select // Import Select from Chakra UI
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const CreateCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState('');
  // const [keywords, setKeywords] = useState([{ keyword: '', exclude: '' }]);
  const [selectedParentId, setSelectedParentId] = useState(null); // Use null for initial state
  const [parentIds, setParentIds] = useState([]); // State to hold parent categories
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/category`);
        if (!response.data || response.status !== 200) {
          throw new Error('Failed to fetch categories');
        }
        setParentIds(response.data); // Assuming data is an array of { id, categoryName }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch categories.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    fetchCategories();
  }, []);
  // Empty dependency array ensures this runs only once on component mount

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCategory('');
    // setKeywords([{ keyword: '', exclude: '' }]);
    setSelectedParentId(null); // Reset to null
  };

  // const handleKeywordChange = (index, key, value) => {
  //   const updatedKeywords = [...keywords];
  //   updatedKeywords[index][key] = value;
  //   setKeywords(updatedKeywords);
  // };

  // const addKeywordField = () => {
  //   setKeywords([...keywords, { keyword: '', exclude: '' }]);
  // };

  // const removeKeywordField = (index) => {
  //   const updatedKeywords = [...keywords];
  //   updatedKeywords.splice(index, 1);
  //   setKeywords(updatedKeywords);
  // };

  const handleSubmit = async () => {
    // Check if required fields are filled
    if (!category.trim() || !selectedParentId) {
      toast({
        title: 'Error',
        description: 'Please enter a category and select a parent Name.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Create a new category object with only categoryName and parentCategoryId
      const newCategory = {
        categoryName: category,
        parentCategoryId: parseInt(selectedParentId), // Ensure parentCategoryId is parsed as a number
      };

      console.log('newCategory : ',newCategory);

      // Send POST request to /category endpoint
      const response = await axios.post(`${backendUrl}/category`, newCategory, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response: ',response);

      if (response.status !== 201) {
        throw new Error('Failed to create category');
      }
      
      
      console.log('Category created successfully:', response);
      handleClose();

      toast({
        title: 'Success',
        description: 'Category created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating category:', error);
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
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
        Add Category
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="600px"> {/* Adjusted width */}
          <ModalHeader>Create a new category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                  id="category"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Box>
              {/* Parent ID Dropdown */}
              <Box>
                <FormLabel htmlFor="parent_id">Parent Name</FormLabel>
                <Select
                  id="parent_id"
                  placeholder="Select parent Name"
                  value={selectedParentId || ''}
                  onChange={(e) => setSelectedParentId(parseInt(e.target.value))}
                >
                  {parentIds.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.categoryName}
                    </option>
                  ))}
                </Select>
              </Box>
              {/* Keywords Input Fields */}
              {/* {keywords.map((keyword, index) => (
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
                    flexShrink={0} // Ensure button width does not shrink
                  >
                    Remove
                  </Button>
                </Flex>
              ))} */}
              {/* Add Keyword Button */}
              {/* <Button size="sm" colorScheme="blue" onClick={addKeywordField}>
                Add Keyword
              </Button> */}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleClose}>Cancel</Button>
            <Button colorScheme="green" onClick={handleSubmit} ml={3}>
              Create Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCategory;
