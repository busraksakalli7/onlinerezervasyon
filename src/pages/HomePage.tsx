import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import background from '../assets/images/rektorlukyeni.jpg';

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'flex-start', // Yukarı hizalama
        alignItems: 'center',
        paddingTop: '1px', // Yukarıdan boşluk
      }}
    > 
      <Container>
        <Typography variant='h4' gutterBottom color='white'>
          Hoş Geldiniz!
        </Typography>
        <Typography variant='body1' color='white'>
          Üniversite bünyesinde araç, konferans salonu ve toplantı odası rezervasyonlarını kolayca yapabilirsiniz.
        </Typography>
        <Button variant='contained' color='primary' component={Link} to='/reservations'>
          Rezervasyon Yap
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
