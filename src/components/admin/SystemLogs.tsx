import React, { useState } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import { SystemLog, PaginationParams } from '../../types';

const INITIAL_PAGINATION: PaginationParams = {
  page: 0,
  limit: 10,
  total: 0,
};

const columns = [
  {
    id: 'timestamp',
    label: 'Tarih/Saat',
    minWidth: 170,
    format: (value: Date) => new Date(value).toLocaleString('tr-TR'),
  },
  {
    id: 'level',
    label: 'Seviye',
    minWidth: 100,
    format: (value: string) => (
      <Chip
        label={value.toUpperCase()}
        color={
          value === 'error' ? 'error' :
          value === 'warning' ? 'warning' :
          'info'
        }
        size="small"
      />
    ),
  },
  { id: 'action', label: 'İşlem', minWidth: 170 },
  { id: 'module', label: 'Modül', minWidth: 130 },
  { id: 'userId', label: 'Kullanıcı', minWidth: 130 },
  { id: 'details', label: 'Detaylar', minWidth: 300 },
];

const SystemLogs = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    level: '',
    module: '',
  });

  // Filtre işlemleri
  const handleFilterChange = (
    e: SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: Date | null) => {
    setFilters(prev => ({ ...prev, [field]: date }));
  };

  const handleApplyFilters = () => {
    // API çağrısı yapılacak
    console.log('Filters:', filters);
  };

  const handleResetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      level: '',
      module: '',
    });
  };

  // Tablo işlemleri
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newLimit: number) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 0 }));
  };

  return (
    <Box>
      {/* Filtreler */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Başlangıç Tarihi"
              value={filters.startDate}
              onChange={handleDateChange('startDate')}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Bitiş Tarihi"
              value={filters.endDate}
              onChange={handleDateChange('endDate')}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Seviye</InputLabel>
              <Select
                name="level"
                value={filters.level}
                onChange={handleFilterChange}
                label="Seviye"
              >
                <MenuItem value="">Tümü</MenuItem>
                <MenuItem value="info">Bilgi</MenuItem>
                <MenuItem value="warning">Uyarı</MenuItem>
                <MenuItem value="error">Hata</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Modül</InputLabel>
              <Select
                name="module"
                value={filters.module}
                onChange={handleFilterChange}
                label="Modül"
              >
                <MenuItem value="">Tümü</MenuItem>
                <MenuItem value="user">Kullanıcı</MenuItem>
                <MenuItem value="resource">Kaynak</MenuItem>
                <MenuItem value="reservation">Rezervasyon</MenuItem>
                <MenuItem value="system">Sistem</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<FilterListIcon />}
                onClick={handleApplyFilters}
                fullWidth
              >
                Filtrele
              </Button>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
              >
                Sıfırla
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Log tablosu */}
      <DataTable
        columns={columns}
        data={logs}
        pagination={pagination}
        loading={loading}
        error={error || undefined}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearch={(query) => console.log('Search:', query)}
      />
    </Box>
  );
};

export default SystemLogs; 