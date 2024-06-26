import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    medicine: '',
    patient: '',
    doctor: ''
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
      const response = await axios.post('http://andromeda.lasdpc.icmc.usp.br:7011/prescription', formData);
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
          label="Medicine"
          name="medicine"
          value={formData.medicine}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Patient"
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Doctor"
          name="doctor"
          value={formData.doctor}
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

export default PrescriptionForm;
