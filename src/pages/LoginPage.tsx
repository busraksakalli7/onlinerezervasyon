import React from 'react';
import logo from '../assets/images/unilogo.jpg';
import background from '../assets/images/rektorlukyeni.jpg';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  IconButton 
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

const LoginPage = () => {
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
          <TextField 
            label='Kullanıcı Adı' 
            variant='outlined' 
            fullWidth 
            margin='normal'
            InputProps={{
              startAdornment: (
                <IconButton disabled>
                  <AccountCircle />
                </IconButton>
              ),
            }}
          />
          <TextField 
            label='Parola' 
            variant='outlined' 
            type='password' 
            fullWidth 
            margin='normal'
            InputProps={{
              startAdornment: (
                <IconButton disabled>
                  <Lock />
                </IconButton>
              ),
            }}
          />
          <Button 
            variant='contained' 
            color='primary' 
            fullWidth 
            sx={{ mt: 2, backgroundColor: '#007bff' }}
          >
            Giriş Yap
          </Button>
          <Button 
            variant='contained' 
            color='error' 
            fullWidth 
            sx={{ mt: 2 }}
          >
            e-Devlet ile Giriş
          </Button>
          <Button 
            variant='outlined' 
            fullWidth 
            sx={{ mt: 2, borderColor: '#007bff', color: '#007bff' }}
          >
            etuKimlik ile Giriş
          </Button>
          <Typography 
            variant='body2' 
            sx={{ mt: 2, color: '#6c757d' }}
          >
            Giriş yapamıyor musunuz?
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
