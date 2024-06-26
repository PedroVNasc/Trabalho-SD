import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';

const ClinicForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    region: '',
    users: []
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
      const response = await axios.post('http://andromeda.lasdpc.icmc.usp.br:7011/clinic', formData);
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
        {/* Additional fields for users if necessary */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ClinicForm;
