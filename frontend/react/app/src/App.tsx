import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormLabel, Grid, InputLabel, TextField } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface FormItemProps {
  label: string,
  id: string,
  size?: number
}

function FormItem(props: FormItemProps) {
  return (
    <Grid item xs={props.size ?? 6}>
      <TextField label={props.label} id={props.id} variant='standard' />
    </Grid>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        color: 'black',
        bgcolor: 'background.paper',
        display: 'flex',
        marginLeft: '10vw',
        width: '80vw',
        height: 'auto',
      }}

      component='form'
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '20vw' }}
      >
        <Tab label="Clinic" {...a11yProps(0)} />
        <Tab label="Doctor" {...a11yProps(1)} />
        <Tab label="Insurance" {...a11yProps(2)} />
        <Tab label="Medicine" {...a11yProps(3)} />
        <Tab label="Pharmacist" {...a11yProps(4)} />
        <Tab label="Prescription" {...a11yProps(5)} />
        <Tab label="PrescriptionRequest" {...a11yProps(6)} />
        <Tab label="User" {...a11yProps(7)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <h2>Informações da Clinica</h2>
        <Grid container spacing={2}>
          <FormItem label='ID' id='clinic_id' />
          <FormItem label='Nome' id='clinic_name' />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Informações do Médico</h2>
        <Grid container spacing={2}>
          <FormItem label='ID' id='doctor_id' size={4} />
          <FormItem label='Nome' id='doctor_name' size={4} />
          <FormItem label='Email' id='doctor_email' size={4} />
          <FormItem label='Telefone' id='doctor_phone' size={4} />
          <FormItem label='Endereço' id='doctor_adress' size={4} />
          <FormItem label='Cidade' id='doctor_city' size={4} />
          <FormItem label='Estado' id='doctor_state' size={4} />
          <FormItem label='CEP' id='doctor_zip' size={4} />
          <FormItem label='Especialidade' id='doctor_specialty' size={4} />
          <FormItem label='CRM' id='doctor_crm' size={4} />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Informações do Seguro</h2>
        <Grid container spacing={2}>
          <FormItem label='Nome' id='insurance_name' />
          <FormItem label='Região' id='insurance_region' />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>Informações do Medicamento</h2>
        <Grid container spacing={2}>
          <FormItem label='Nome' id='medicine_name' />
          <FormItem label='Nome Genérico' id='medicine_generic' />
          <FormItem label='Marca' id='medicine_brand' />
          <FormItem label='Dosagem' id='medicine_dosage' />
          <FormItem label='Força' id='medicine_strength' />
          <FormItem label='Fabricante' id='medicine_manufacturer' />
          <FormItem label='Data de Expiração' id='medicine_expiration' />
          <FormItem label='Número de Lote' id='medicine_batch' />
          <FormItem label='Indicações' id='medicine_indications' />
          <FormItem label='Preço' id='medicine_price' />
          <FormItem label='Exige prescricão?' id='medicine_prescription' />
          <FormItem label='Quantidade' id='medicine_quantity' />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Pharmacist
      </TabPanel>
      <TabPanel value={value} index={5}>
        Prescription
      </TabPanel>
      <TabPanel value={value} index={6}>
        PrescriptionRequest
      </TabPanel>
      <TabPanel value={value} index={7}>
        User
      </TabPanel>
    </Box>
  );
}

export default App