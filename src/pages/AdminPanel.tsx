import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import background from '../assets/images/rektorlukyeni.jpg';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import HistoryIcon from '@mui/icons-material/History';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import UserManagement from '../components/admin/UserManagement';
import ResourceManagement from '../components/admin/ResourceManagement';
import ReservationHistory from '../components/admin/ReservationHistory';
import SystemLogs from '../components/admin/SystemLogs';

const AdminPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          pt: '64px', // Navbar yüksekliği
          pb: '80px', // Footer için boşluk
        }}
      >
        {/* Ana içerik alanı */}
        <Box 
          component="main"
          sx={{ 
            flexGrow: 1,
            p: 3,
          }}
        >
          <Container maxWidth="xl">
            {/* Başlık Kartı */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3,
                mb: 3,
                background: alpha(theme.palette.background.paper, 0.9),
                borderRadius: 2
              }}
            >
              <Typography 
                variant='h4' 
                gutterBottom 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Yönetim Paneli
              </Typography>
            </Paper>

            {/* Ana İçerik Kartı */}
            <Paper 
              elevation={3} 
              sx={{ 
                background: alpha(theme.palette.background.paper, 0.9),
                borderRadius: 2,
                minHeight: '600px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Sekmeli Yönetim Sistemi */}
              <Tabs 
                value={tabIndex} 
                onChange={(e, newValue) => setTabIndex(newValue)}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    py: 2,
                    fontSize: '1rem'
                  }
                }}
              >
                <Tab 
                  icon={<PeopleAltIcon />} 
                  iconPosition="start" 
                  label="Kullanıcı Yönetimi"
                />
                <Tab 
                  icon={<InventoryIcon />} 
                  iconPosition="start" 
                  label="Kaynak Yönetimi"
                />
                <Tab 
                  icon={<HistoryIcon />} 
                  iconPosition="start" 
                  label="Rezervasyon Geçmişi"
                />
                <Tab 
                  icon={<MonitorHeartIcon />} 
                  iconPosition="start" 
                  label="Sistem Logları"
                />
              </Tabs>

              {/* Sekmelerin içeriği */}
              <Box sx={{ p: 3, flexGrow: 1 }}>
                {tabIndex === 0 && <UserManagement />}
                {tabIndex === 1 && <ResourceManagement />}
                {tabIndex === 2 && <ReservationHistory />}
                {tabIndex === 3 && <SystemLogs />}
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPanel;
