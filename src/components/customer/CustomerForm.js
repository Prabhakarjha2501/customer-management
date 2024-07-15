import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { createCustomer, updateCustomer, getCustomerById } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCustomer(id, form);
        alert('Customer updated successfully');
      } else {
        await createCustomer(form);
        alert('Customer created successfully');
      }
    } catch (error) {
      alert('Error creating/updating customer');
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        const { data } = await getCustomerById(id);
        setForm(data);
      }
    };
    fetchCustomer();
  }, [id]);

   const getAllCustomer =()=>{
        navigate('/customer/list')
   }

  return (
    <Container>
      <Typography variant="h4">{id ? 'Update' : 'Create'} Customer</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="street" label="Street" value={form.street} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="address" label="Address" value={form.address} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="city" label="City" value={form.city} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="state" label="State" value={form.state} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="phone" label="Phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">{id ? 'Update' : 'Create'}</Button>
        <Button variant="contained" color="primary" onClick={getAllCustomer}>CustomerList</Button>
      </form>
    </Container>
  );
};

export default CustomerForm;