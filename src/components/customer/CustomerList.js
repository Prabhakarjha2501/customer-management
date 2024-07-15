import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography } from '@mui/material';
import { getAllCustomers, deleteCustomerById } from '../../services/api';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(5);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await getAllCustomers(page, pageSize);
      setCustomers(data.content);
    };
    fetchCustomers();
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    try {
      await deleteCustomerById(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
      alert('Customer deleted successfully');
    } catch (error) {
      alert('Error deleting customer');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Customer List</Typography>
      <Button component={Link} to="/customer/create" variant="contained" color="primary">Create Customer</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.firstName}</TableCell>
              <TableCell>{customer.lastName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                <Button component={Link} to={`/customer/update/${customer.id}`} variant="contained" color="primary">Update</Button>
                <Button onClick={() => handleDelete(customer.id)} variant="contained" color="secondary">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default CustomerList;