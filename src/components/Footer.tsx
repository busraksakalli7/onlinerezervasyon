import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component='footer' 
      sx={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2, 
        backgroundColor: 'transparent',
        color: '#fff',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      <Typography 
        variant='body2'
        sx={{
          fontWeight: 500,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        © 2024 Erzurum Teknik Üniversitesi Rezervasyon Sistemi
      </Typography>
    </Box>
  );
};

export default Footer;
