import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import CustomerForm from './components/customer/CustomerForm';
import CustomerList from './components/customer/CustomerList';

const App = () => (
  <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/customer/create" element={<CustomerForm />} />
      <Route path="/customer/update/:id" element={<CustomerForm />} />
      <Route path="/customer/list" element={<CustomerList />} />
      <Route path="/" element={<Navigate to="/signin" />} />
      
    </Routes>

    
  </Router>
);

export default App;