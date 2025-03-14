import React from 'react';
import logo from '../assets/images/unilogo.jpg';
import background from '../assets/images/rektorlukyeni.jpg';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper 
} from '@mui/material';

const RegisterPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth='xs'>
        <Paper 
          elevation={3} 
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <img 
            src={logo} 
            alt='Üniversite Logosu' 
            style={{ width: '100px', marginBottom: '20px' }} 
          />
          <Typography variant='h5' gutterBottom>
            Kayıt Ol
          </Typography>
          <TextField 
            label='Ad Soyad' 
            variant='outlined' 
            fullWidth 
            margin='normal' 
          />
          <TextField 
            label='E-posta' 
            variant='outlined' 
            fullWidth 
            margin='normal' 
          />
          <TextField 
            label='Şifre' 
            variant='outlined' 
            type='password' 
            fullWidth 
            margin='normal' 
          />
          <Button 
            variant='contained' 
            color='primary' 
            fullWidth 
            sx={{ mt: 2, backgroundColor: '#007bff' }}
          >
            Kayıt Ol
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
