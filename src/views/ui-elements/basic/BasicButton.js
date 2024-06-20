import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  CheckboxGroup,
  Checkbox,
  // Radio,
  // RadioGroup,
  Stack,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Icon,
  Progress,
  Text,
  Flex,
  Grid,
  GridItem,
  Td
} from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import PieDonutChart from '../../../views/charts/nvd3-chart/chart/PieDonutChart';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const dashSalesData = [
  { title: 'Facebook', amount: '$249.95', icon: FaArrowUp, iconColor: 'green.400', value: 50, progressColor: 'green' },
  { title: 'Instagram', amount: '$2.942.32', icon: FaArrowDown, iconColor: 'red.400', value: 36, progressColor: 'red' },
  { title: 'LinkedIn', amount: '$8.638.32', icon: FaArrowUp, iconColor: 'green.400', value: 70, progressColor: 'green' }
];

const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const status = false

const BasicButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [platforms, setPlatforms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const userId = Number(getCookieValue('userId'));

  useEffect(() => {
    fetchCategories();
    fetchCountries();
    fetchRecentLeads();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchKeywords(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const url = userId && userId !== 1 ? `${backendUrl}/category/user/${userId}` : `${backendUrl}/category`;
      const response = await axios.get(url);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchRecentLeads = async () => {
    try {
      const url = userId !== 1 ? `${backendUrl}/lead/user/${userId}` : `${backendUrl}/lead`
      
      
      const response = await axios.get(url);
      if (!response.data || response.status !== 200) {
        throw new Error('Failed to fetch recent leads');
      }
      console.log(response.data);
      setRecentLeads(response.data);
    } catch (error) {
      console.error('Error fetching recent leads:', error);
    }
  };

  const fetchKeywords = async (categoryId) => {
    try {
      const url = `${backendUrl}/keyword/category/${categoryId}`;
      const response = await axios.get(url);
      setKeywords(response.data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/country/user/${userId}`);
      if (!response.data || response.status !== 200) {
        throw new Error('Failed to fetch countries');
      }
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handlePlatformChange = (selectedOptions) => {
    setPlatforms(selectedOptions);
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSelectedKeyword('');
  };

  const handleKeywordChange = (selectedKeyword) => {
    setSelectedKeyword(selectedKeyword);
  };

  const handleSubmit = async () => {
    const leadData = {
      lastActivity: new Date().toISOString(),
      platform: platforms.join(', '),
      status,
      userId,
      countryId: parseInt(selectedCountry, 10),
      keywordId: parseInt(selectedKeyword, 10)
    };
  
    try {
      const url = `${backendUrl}/lead`;
      const response = await axios.post(url, leadData);
      console.log('Lead created:', response.data);
      // Assuming you want to do something with the response data, you can handle it here
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  
    console.log('Lead data:', leadData);
    onClose();
  };
    return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={[12, 12]}>
          <Box mt={4} textAlign="right">
            <Button colorScheme="blue" onClick={onOpen}>Add Lead</Button>
          </Box>
        </GridItem>
        {dashSalesData.map((data, index) => (
          <GridItem key={index} colSpan={[12, 6, 4]}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
              <Text fontSize="lg" mb={2}>{data.title}</Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Icon as={data.icon} color={data.iconColor} w={6} h={6} mr={2} />
                  <Text fontSize="xl" fontWeight="bold">{data.amount}</Text>
                </Flex>
                <Text>{data.value}%</Text>
              </Flex>
              <Progress mt={2} value={data.value} colorScheme={data.progressColor} />
            </Box>
          </GridItem>
        ))}
        <GridItem colSpan={[12, 8]}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Text fontSize="lg" mb={2}>Recent Leads</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Last Activity</Th>
                  <Th>Status</Th>
                  <Th>Platform</Th>
                  <Th>Country Name</Th>
                  <Th>Keyword Data</Th>
                  <Th>Exclude</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentLeads.map((lead) => (
                  <Tr key={lead.id}>
                    <Td>{lead.user.username}</Td>
                    <Td>{new Date(lead.lastActivity).toLocaleString()}</Td>
                    <Td>{lead.status? 'True' : 'False'}</Td>
                    <Td>{lead.platform}</Td>
                    <Td>{lead.country.countryName}</Td>
                    <Td>{lead.keyword.keywordData}</Td>
                    <Td>{lead.keyword.exclude}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
        <GridItem colSpan={[12, 4]}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <PieDonutChart />
          </Box>
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Lead</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Platform</FormLabel>
              <CheckboxGroup onChange={handlePlatformChange}>
                <Stack spacing={2} direction="row">
                  <Checkbox value="WEB">WEB</Checkbox>
                  <Checkbox value="TWITTER">TWITTER</Checkbox>
                  <Checkbox value="FACEBOOK">FACEBOOK</Checkbox>
                  <Checkbox value="LINKEDIN">LINKEDIN</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Country</FormLabel>
              <Select placeholder="Select Country" onChange={(e) => setSelectedCountry(e.target.value)}>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.countryName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select Category" onChange={(e) => handleCategoryChange(e.target.value)}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Select>
            </FormControl>
            {selectedCategory && (
              <FormControl mb={4}>
                <FormLabel>Keyword</FormLabel>
                <Select placeholder="Select Keyword" onChange={(e) => handleKeywordChange(e.target.value)}>
                  {keywords.map((keyword) => (
                    <option key={keyword.id} value={keyword.id}>
                      {keyword.keywordData}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Close</Button>
            <Button colorScheme="blue" onClick={handleSubmit}>Add Lead</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BasicButton;
