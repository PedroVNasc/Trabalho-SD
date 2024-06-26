import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormLabel, Grid, InputLabel, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
      className='tab-panel'
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

interface FormTextProps {
  label: string,
  id: string,
  type?: string
  size?: number
}

function FormText(props: FormTextProps) {
  return (
    <Grid item xs={props.size ?? 6}>
      <TextField label={props.label} type={props.type ?? 'text'} id={props.id} variant='standard' />
    </Grid>
  )
}

function FormDate(props: { size?: number, label: string }) {
  return (
    <Grid item xs={props.size ?? 6}>
      <FormLabel>{props.label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
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
        borderRadius: '30px',
        boxShadow: 'black 5px 0px 5px 0px',
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
        <Tab label="Pharmacy" {...a11yProps(5)} />
        <Tab label="Prescription" {...a11yProps(6)} />
        <Tab label="PrescriptionRequest" {...a11yProps(7)} />
        <Tab label="User" {...a11yProps(8)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <h2>Informações da Clinica</h2>
        <Grid container spacing={2}>
          <FormText label='ID' id='clinic_id' size={12} type='number' />
          <FormText label='Nome' id='clinic_name' size={12} />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <h2>Informações do Médico</h2>
        <Grid container spacing={2}>
          <FormText label='ID' id='doctor_id' type='number' />
          <FormText label='Nome' id='doctor_name' />
          <FormText label='Email' id='doctor_email' type='email' />
          <FormText label='Telefone' id='doctor_phone' type='tel' />
          <FormText label='Endereço' id='doctor_adress' size={4} />
          <FormText label='Cidade' id='doctor_city' size={4} />
          <FormText label='Estado' id='doctor_state' size={4} />
          <FormText label='CEP' id='doctor_zip' size={4} />
          <FormText label='Especialidade' id='doctor_specialty' size={4} />
          <FormText label='CRM' id='doctor_crm' size={4} />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <h2>Informações do Seguro</h2>
        <Grid container spacing={2}>
          <FormText label='Nome' id='insurance_name' />
          <FormText label='Região' id='insurance_region' />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <h2>Informações do Medicamento</h2>
        <Grid container spacing={2}>
          <FormText label='Nome' id='medicine_name' />
          <FormText label='Nome Genérico' id='medicine_generic' />
          <FormText label='Marca' id='medicine_brand' />
          <FormText label='Dosagem' id='medicine_dosage' />
          <FormText label='Força' id='medicine_strength' />
          <FormText label='Fabricante' id='medicine_manufacturer' />
          <FormDate label='Data de Expiração' />
          <FormText label='Número de Lote' id='medicine_batch' />
          <FormText label='Indicações' id='medicine_indications' />
          <FormText label='Preço' id='medicine_price' type='' />
          <FormText label='Exige prescricão?' id='medicine_prescription' />
          <FormText label='Quantidade' id='medicine_quantity' type='number' />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={4}>
        <h2>Informações do Farmaceutico</h2>
        <Grid container spacing={2}>
          <FormText label='ID' id='pharmacist_id' type='number' />
          <FormText label='Nome' id='pharmacist_name' />
          <FormText label='Endereço' id='pharmacist_adress' />
          <FormText label='Telefone' id='pharmacist_phone' />
          <FormText label='Email' id='pharmacist_email' />
          <FormText label='Licença' id='pharmacist_license' />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={5}>
        <h2>Informações da Farmácia</h2>
        <Grid container spacing={2}>
          <FormText label='Região' id='pharmacy_region' />
          <FormText label='Nome' id='pharmacy_name' />
          <FormText label='Endereço' id='pharmacy_address' />
          <FormText label='Medicamentos' id='pharmacy_medicines' />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={6}>
        <h2>Informações da Prescrição</h2>
        <Grid container spacing={2}>
          <FormText label='ID' id='prescription_id' type='number' />
          <FormText label='Medicamento' id='prescription_medicine' />
          <FormText label='Paciente' id='prescription_patient' />
          <FormText label='Doutor' id='prescription_doctor' />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={7}>
        <h2>Informações da Requisição de Prescricao</h2>
        <Grid container spacing={2}>
          <FormText label='Prescricao' id='prescriptionRequest_prescription' />
          <FormText label='Aprovado' id='prescriptionRequest_aproved' />
          <FormText label='Prontuario' id='prescriptionRequest_readiness' />
          <FormText label='Farmaceutico' id='prescriptionRequest_pharmacist' />
          <FormDate label='Data da Requisição' />
          <FormDate label='Data de Entrega' />
          <FormText label='Status' id='prescriptionRequest_status' />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={8}>
        <h2>Informações do Usuário</h2>
        <Grid container spacing={2}>
          <FormText label='CNS' id='user_CNS' />
          <FormText label='Nome' id='user_name' />
          <FormDate label='Data de Nascimento' />
          <FormText label='Email' id='user_email' />
          <FormText label='Telefone' id='user_phone' />
          <FormText label='Senha' id='user_password' />
          <FormText label='Sexo' id='user_sex' />
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default App