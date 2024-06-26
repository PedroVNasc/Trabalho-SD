import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';

const PharmacistForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    region: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    licenseNumber: '',
    pharmacyId: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://andromeda.lasdpc.icmc.usp.br:7011/pharmacist', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="License Number"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Pharmacy ID"
          name="pharmacyId"
          value={formData.pharmacyId}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PharmacistForm;
