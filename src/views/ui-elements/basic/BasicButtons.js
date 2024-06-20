import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  GridItem,
  Td
} from '@chakra-ui/react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};


const BasicButtons = () => {
  
  const [recentLeads, setRecentLeads] = useState([]);
  const userId = Number(getCookieValue('userId'));

  useEffect(() => {
    fetchRecentLeads();
  }, []);


  const fetchRecentLeads = async () => {
    try {
      const url = userId !== 1 ? `${backendUrl}/lead-data/user/${userId}` : `${backendUrl}/lead-data`
      
      
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

    return (
        <GridItem colSpan={[12, 8]}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Text fontSize="lg" mb={2}>Recent Leads</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Account Name</Th>
                  <Th>Account Url</Th>
                  <Th>Gmail</Th>
                  <Th>Phone Number</Th>
                  <Th>Website Url</Th>
                  <Th>Platform</Th>
                  <Th>Snippet Text</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentLeads.map((lead) => (
                  <Tr key={lead.id}>
                    <Td>{lead.accountName}</Td>
                    <Td>{lead.accountUrl}</Td>
                    <Td>{lead.gmail}</Td>
                    <Td>{lead.phoneNumber}</Td>
                    <Td>{lead.websiteUrl}</Td>
                    <Td>{lead.platform}</Td>
                    <Td>{lead.snippetText}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          </GridItem>
  );
};

export default BasicButtons;
