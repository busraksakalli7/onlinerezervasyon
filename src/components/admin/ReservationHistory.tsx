import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import FormDialog from '../common/FormDialog';
import { Reservation, PaginationParams } from '../../types';

const INITIAL_PAGINATION: PaginationParams = {
  page: 0,
  limit: 10,
  total: 0,
};

const columns = [
  { 
    id: 'resourceId', 
    label: 'Kaynak', 
    minWidth: 170,
    // Bu kısım API entegrasyonunda resource bilgisi ile güncellenecek
    format: (value: string) => `Kaynak ${value}`,
  },
  { 
    id: 'userId', 
    label: 'Kullanıcı', 
    minWidth: 170,
    // Bu kısım API entegrasyonunda user bilgisi ile güncellenecek
    format: (value: string) => `Kullanıcı ${value}`,
  },
  {
    id: 'startDate',
    label: 'Başlangıç',
    minWidth: 130,
    format: (value: Date) => new Date(value).toLocaleString('tr-TR'),
  },
  {
    id: 'endDate',
    label: 'Bitiş',
    minWidth: 130,
    format: (value: Date) => new Date(value).toLocaleString('tr-TR'),
  },
  {
    id: 'status',
    label: 'Durum',
    minWidth: 100,
    format: (value: string) => {
      const statuses = {
        pending: 'Bekliyor',
        approved: 'Onaylandı',
        rejected: 'Reddedildi',
        cancelled: 'İptal Edildi',
      };
      return (
        <Chip 
          label={statuses[value as keyof typeof statuses]} 
          color={
            value === 'approved' ? 'success' :
            value === 'rejected' ? 'error' :
            value === 'cancelled' ? 'default' : 'warning'
          }
          size="small"
        />
      );
    },
  },
  { id: 'purpose', label: 'Amaç', minWidth: 170 },
  { 
    id: 'participantCount', 
    label: 'Katılımcı Sayısı', 
    minWidth: 100,
    format: (value: number) => value || '-',
  },
];

const ReservationHistory = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    status: '',
    resourceId: '',
    userId: '',
  });

  // Filtre işlemleri
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
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
      status: '',
      resourceId: '',
      userId: '',
    });
  };

  // Tablo işlemleri
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newLimit: number) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 0 }));
  };

  const handleView = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setDialogOpen(true);
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
              <InputLabel>Durum</InputLabel>
              <Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                label="Durum"
              >
                <MenuItem value="">Tümü</MenuItem>
                <MenuItem value="pending">Bekliyor</MenuItem>
                <MenuItem value="approved">Onaylandı</MenuItem>
                <MenuItem value="rejected">Reddedildi</MenuItem>
                <MenuItem value="cancelled">İptal Edildi</MenuItem>
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

      {/* Rezervasyon tablosu */}
      <DataTable
        columns={columns}
        data={reservations}
        pagination={pagination}
        loading={loading}
        error={error || undefined}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onView={handleView}
        onSearch={(query) => console.log('Search:', query)}
      />

      {/* Rezervasyon detay dialog */}
      <FormDialog
        open={dialogOpen}
        title="Rezervasyon Detayları"
        onClose={() => setDialogOpen(false)}
        onSubmit={() => setDialogOpen(false)}
        submitText="Kapat"
        maxWidth="md"
      >
        {selectedReservation && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kaynak"
                value={`Kaynak ${selectedReservation.resourceId}`}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kullanıcı"
                value={`Kullanıcı ${selectedReservation.userId}`}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Başlangıç Tarihi"
                value={new Date(selectedReservation.startDate).toLocaleString('tr-TR')}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bitiş Tarihi"
                value={new Date(selectedReservation.endDate).toLocaleString('tr-TR')}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Durum"
                value={selectedReservation.status}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Katılımcı Sayısı"
                value={selectedReservation.participantCount || '-'}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amaç"
                value={selectedReservation.purpose}
                multiline
                rows={2}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            {selectedReservation.notes && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notlar"
                  value={selectedReservation.notes}
                  multiline
                  rows={3}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            )}
          </Grid>
        )}
      </FormDialog>
    </Box>
  );
};

export default ReservationHistory; 