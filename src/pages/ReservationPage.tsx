import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Box,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

interface FormData {
  resource: string;
  date: Date | null;
  time: Date | null;
  name: string;
  email: string;
  participants: string;
  notes: string;
}

const initialFormData: FormData = {
  resource: '',
  date: null,
  time: null,
  name: '',
  email: '',
  participants: '',
  notes: ''
};

const ReservationPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = ['Kaynak Seçimi', 'Kişisel Bilgiler', 'Onay'];

  const handleInputChange = (field: keyof FormData) => (event: any) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateChange = (newDate: Date | null) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleTimeChange = (newTime: Date | null) => {
    setFormData({ ...formData, time: newTime });
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prev) => prev + 1);
    } else {
      setSnackbar({
        open: true,
        message: 'Lütfen tüm gerekli alanları doldurun',
        severity: 'error'
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const validateCurrentStep = () => {
    switch (activeStep) {
      case 0:
        return formData.resource && formData.date && formData.time;
      case 1:
        return formData.name && formData.email;
      default:
        return true;
    }
  };

  const handleReservation = () => {
    if (validateCurrentStep()) {
      // Burada API çağrısı yapılabilir
      setSnackbar({
        open: true,
        message: 'Rezervasyonunuz başarıyla oluşturuldu!',
        severity: 'success'
      });
      setFormData(initialFormData);
      setActiveStep(0);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Kaynak Seç</InputLabel>
                <Select
                  value={formData.resource}
                  onChange={handleInputChange('resource')}
                  startAdornment={<MeetingRoomIcon sx={{ mr: 1 }} />}
                >
                  <MenuItem value={'Araç'}>Araç</MenuItem>
                  <MenuItem value={'Konferans Salonu'}>Konferans Salonu</MenuItem>
                  <MenuItem value={'Toplantı Odası'}>Toplantı Odası</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Tarih Seç'
                  value={formData.date}
                  onChange={handleDateChange}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label='Saat Seç'
                  value={formData.time}
                  onChange={handleTimeChange}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ad Soyad"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="E-posta"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Katılımcı Sayısı"
                type="number"
                value={formData.participants}
                onChange={handleInputChange('participants')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notlar"
                multiline
                rows={4}
                value={formData.notes}
                onChange={handleInputChange('notes')}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Rezervasyon Özeti</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Kaynak:</Typography>
                  <Typography>{formData.resource}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Tarih:</Typography>
                  <Typography>{formData.date?.toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Saat:</Typography>
                  <Typography>{formData.time?.toLocaleTimeString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Ad Soyad:</Typography>
                  <Typography>{formData.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">E-posta:</Typography>
                  <Typography>{formData.email}</Typography>
                </Grid>
                {formData.participants && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Katılımcı Sayısı:</Typography>
                    <Typography>{formData.participants}</Typography>
                  </Grid>
                )}
                {formData.notes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Notlar:</Typography>
                    <Typography>{formData.notes}</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              <EventIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Rezervasyon
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Rezervasyon yapmak için aşağıdaki adımları takip edin
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Geri
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleReservation : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Rezervasyonu Tamamla' : 'İleri'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReservationPage;
