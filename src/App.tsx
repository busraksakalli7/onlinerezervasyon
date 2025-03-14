import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReservationPage from './pages/ReservationPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppWithRouting />
    </Router>
  );
};

const AppWithRouting = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}
    >
      <Navbar /> {/* Navbar'ı her zaman göster */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/reservations' element={<ReservationPage />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
