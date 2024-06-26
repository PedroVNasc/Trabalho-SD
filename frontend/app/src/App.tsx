import React from 'react';
import { Container, Tab, Tabs, Box } from '@mui/material';
import ClinicForm from './forms/ClinicForm';
import DoctorForm from './forms/DoctorForm';
import InsuranceForm from './forms/InsuranceForm';
import MedicineForm from './forms/MedicineForm';
import PharmacistForm from './forms/PharmacistForm';
import PharmacyStockForm from './forms/PharmacyStockForm';
import PrescriptionForm from './forms/PrescriptionForm';
import PrescriptionRequestForm from './forms/PrescriptionRequestForm';
import UserForm from './forms/UserForm';

const App: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%', mt: 3 }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Clinic" />
          <Tab label="Doctor" />
          <Tab label="Insurance" />
          <Tab label="Medicine" />
          <Tab label="Pharmacist" />
          <Tab label="Pharmacy Stock" />
          <Tab label="Prescription" />
          <Tab label="Prescription Request" />
          <Tab label="User" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 3 }}>
        {value === 0 && <ClinicForm />}
        {value === 1 && <DoctorForm />}
        {value === 2 && <InsuranceForm />}
        {value === 3 && <MedicineForm />}
        {value === 4 && <PharmacistForm />}
        {value === 5 && <PharmacyStockForm />}
        {value === 6 && <PrescriptionForm />}
        {value === 7 && <PrescriptionRequestForm />}
        {value === 8 && <UserForm />}
      </Box>
    </Container>
  );
};

export default App;
