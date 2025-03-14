import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar 
      position='absolute' 
      sx={{ 
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        zIndex: 10
      }}
    >
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: 'white' }}>
          Online Rezervasyon Sistemi
        </Typography>
        <Button sx={{ color: 'white' }} component={Link} to='/'>Ana Sayfa</Button>
        <Button sx={{ color: 'white' }} component={Link} to='/login'>Giriş Yap</Button>
        <Button sx={{ color: 'white' }} component={Link} to='/register'>Kayıt Ol</Button>
        <Button sx={{ color: 'white' }} component={Link} to='/admin'>Admin Paneli</Button> {/* Admin Paneli Butonu */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
