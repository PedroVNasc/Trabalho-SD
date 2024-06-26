import React, { useState } from 'react';
import { TextField, Button, Container, Box, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const PrescriptionRequestForm = () => {
  const [formData, setFormData] = useState({
    prescription: '',
    aproved: false,
    readiness: '',
    pharmacist: '',
    requestDate: '',
    deliveryDate: '',
    status: ''
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://andromeda.lasdpc.icmc.usp.br:7011/prescriptionRequest', formData);
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
          label="Prescription"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.aproved}
              onChange={handleChange}
              name="aproved"
            />
          }
          label="Approved"
        />
        <TextField
          fullWidth
          label="Readiness"
          name="readiness"
          value={formData.readiness}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Pharmacist"
          name="pharmacist"
          value={formData.pharmacist}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Request Date"
          name="requestDate"
          type="date"
          value={formData.requestDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Delivery Date"
          name="deliveryDate"
          type="date"
          value={formData.deliveryDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Status"
          name="status"
          value={formData.status}
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

export default PrescriptionRequestForm;
