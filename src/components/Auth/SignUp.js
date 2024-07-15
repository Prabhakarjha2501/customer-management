import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { signUp } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate=useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '',firstname:'',lastname:'' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signUp(form);
      alert('Sign up successful!');
    } catch (error) {
      alert('Sign up failed');
    }
  };

  const handleSignIn = () => {
    navigate('/signin'); // Navigate to signin page
  };

  return (
    <Container>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="firstname" label="firstname" value={form.firstname} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="lastname" label="lastname" value={form.lastname} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="confirmPassword" label="Confirm Password" type="password" value={form.confirmPassword} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
      
      <Button variant="contained" color="primary" onClick={handleSignIn}>Sign In</Button>
      </form>
    </Container>
  );
};

export default SignUp;