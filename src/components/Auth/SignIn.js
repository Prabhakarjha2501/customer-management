import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { signIn } from '../../services/auth';
import { setSession } from '../../services/axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate=useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signIn(form);
      setSession(data.token, data.refreshtoken);
        
      alert('Sign in successful!');
      window.location.href = '/customer/create'; // Redirect to home or dashboard
    } catch (error) {
      console.error('Sign in failed', error);
      alert('Sign in failed');
    }
  };
  const handleSignUp = () => {
        navigate('/signup'); // Navigate to signin page
       };

  return (
    <Container>
      <Typography variant="h4">Sign In</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Sign In</Button>
        <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
      </form>
    </Container>
  );
};

export default SignIn;








// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography } from '@mui/material';
// import { signIn } from '../../services/auth';

// const SignIn = () => {
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await signIn(form);
//       localStorage.setItem('accessToken', data.accessToken);
//       localStorage.setItem('refreshToken', data.refreshToken);
//       alert('Sign in successful!');
//     // if (data.accessToken && data.refreshToken) {
//     //     localStorage.setItem('accessToken', data.accessToken);
//     //     localStorage.setItem('refreshToken', data.refreshToken);
//     //     alert('Sign in successful!');
//     //   } else {
//     //     console.error('Invalid tokens received:', data); // Log unexpected response
//     //     alert('Sign in failed: Invalid tokens received');
//     //   }
//     } catch (error) {
//         console.error('Sign in failed', error); 
//       alert('Sign in failed');
//     }
//   };
 

//   return (
//     <Container>
//       <Typography variant="h4">Sign In</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
//         <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
//         <Button type="submit" variant="contained" color="primary">Sign In</Button>
//       </form>
//     </Container>
//   );
// };

// export default SignIn;