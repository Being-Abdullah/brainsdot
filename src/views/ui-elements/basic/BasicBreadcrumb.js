import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const BasicBreadcrumb = () => {
  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const regionTableRef = useRef(null);
  const regionWithCountriesTableRef = useRef(null);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axios.get(`${backendUrl}/country`);
      // Process the response to group countries by region
      const groupedRegions = groupCountriesByRegion(response.data);
      setRegions(groupedRegions);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  // Function to group countries by region
  const groupCountriesByRegion = (countries) => {
    const groupedRegions = {};
    countries.forEach((country) => {
      const regionId = country.region.id;
      if (!groupedRegions[regionId]) {
        groupedRegions[regionId] = {
          id: regionId,
          regionName: country.region.regionName,
          countries: [country.countryName],
        };
      } else {
        groupedRegions[regionId].countries.push(country.countryName);
      }
    });
    return Object.values(groupedRegions); // Convert object back to array
  };

  const addRegion = async () => {
    try {
      if (newRegion.trim() !== '' && !regions.some((region) => region.regionName === newRegion)) {
        const response = await axios.post(`${backendUrl}/region`, { regionName: newRegion });
        setRegions([...regions, { id: response.data.id, regionName: response.data.regionName, countries: [] }]);
        setNewRegion('');
      }
    } catch (error) {
      console.error('Error adding region:', error);
    }
  };

  const addCountry = async () => {
    if (selectedRegion.trim() === '') {
      alert('Please select a region first.');
      setNewCountry('');
      return;
    }

    try {
      const regionId = regions.find((region) => region.regionName === selectedRegion)?.id;
      if (!regionId) {
        console.error('Region ID not found for selected region:', selectedRegion);
        return;
      }

      const response = await axios.post(`${backendUrl}/country`, {
        regionId: Number(regionId), // Ensure regionId is sent as a number
        countryName: newCountry,
      });

      console.log(response);

      const updatedRegions = [...regions];
      const regionIndex = updatedRegions.findIndex((region) => region.id === regionId);
      if (regionIndex !== -1) {
        updatedRegions[regionIndex].countries.push(newCountry);
        setRegions(updatedRegions);
        setNewCountry('');
      } else {
        console.error('Region not found in local state:', selectedRegion);
      }
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  };

  return (
    <Container maxW="container.xl" mt={8}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Box bg="white" p={4} boxShadow="md" borderRadius="md">
            <Heading as="h5" size="md" mb={4}>
              Add Regions and Countries
            </Heading>
            <FormControl id="formRegion" mb={4}>
              <FormLabel>Add Region</FormLabel>
              <Grid templateColumns="1fr auto" gap={2}>
                <Input
                  type="text"
                  placeholder="Enter region"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                />
                <Button colorScheme="blue" onClick={addRegion}>
                  Add Region
                </Button>
              </Grid>
            </FormControl>
            <FormControl id="formCountry">
              <FormLabel>Add Country</FormLabel>
              <Grid templateColumns="1fr" gap={2}>
                <Input
                  type="text"
                  placeholder="Enter country"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                />
                <Select
                  placeholder="Select region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  mt={2}
                >
                  {regions.map((region) => (
                    <option key={region.id} value={region.regionName}>
                      {region.regionName}
                    </option>
                  ))}
                </Select>
                <Button colorScheme="blue" onClick={addCountry} mt={2}>
                  Add Country
                </Button>
              </Grid>
            </FormControl>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Box bg="white" p={4} boxShadow="md" borderRadius="md" mb={6}>
            <Heading as="h6" size="md" mb={4}>
              Regions
            </Heading>
            <Box maxH="100px" overflowY="auto" ref={regionTableRef} sx={customScrollbarStyle}>
              <Table variant="striped" colorScheme="blue" size="md">
                <Thead>
                  <Tr>
                    <Th>Region</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {regions.map((region, index) => (
                    <Tr key={index}>
                      <Td>{region.regionName}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
          <Box bg="white" p={4} boxShadow="md" borderRadius="md">
            <Heading as="h6" size="md" mb={4}>
              Regions with Countries
            </Heading>
            <Box maxH="200px" overflowY="auto" ref={regionWithCountriesTableRef} sx={customScrollbarStyle}>
              <Table variant="striped" colorScheme="blue" size="md">
                <Thead>
                  <Tr>
                    <Th>Region</Th>
                    <Th>Countries</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {regions.map((region, index) => (
                    <Tr key={index}>
                      <Td>{region.regionName}</Td>
                      <Td>
                        {region.countries && region.countries.length > 0
                          ? region.countries.join(', ')
                          : '-'}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default BasicBreadcrumb;
