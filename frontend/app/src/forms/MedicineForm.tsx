import { useState } from 'react';
import { TextField, Button, Container, Box, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const MedicineForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    brandName: '',
    dosageForm: '',
    strength: '',
    manufacturer: '',
    expiryDate: '',
    batchNumber: '',
    indications: '',
    contraindications: '',
    sideEffects: '',
    storageConditions: '',
    price: '',
    prescriptionRequired: false,
    quantity: ''
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
      const response = await axios.post('http://andromeda.lasdpc.icmc.usp.br:7011/medicine', formData);
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
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Generic Name"
          name="genericName"
          value={formData.genericName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Brand Name"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Dosage Form"
          name="dosageForm"
          value={formData.dosageForm}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Strength"
          name="strength"
          value={formData.strength}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Expiry Date"
          name="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Batch Number"
          name="batchNumber"
          value={formData.batchNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Indications"
          name="indications"
          value={formData.indications}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contraindications"
          name="contraindications"
          value={formData.contraindications}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Side Effects"
          name="sideEffects"
          value={formData.sideEffects}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Storage Conditions"
          name="storageConditions"
          value={formData.storageConditions}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.prescriptionRequired}
              onChange={handleChange}
              name="prescriptionRequired"
            />
          }
          style={{color: 'black'}}
          label="Prescription Required"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          value={formData.quantity}
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

export default MedicineForm;
