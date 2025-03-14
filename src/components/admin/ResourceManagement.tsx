import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Chip,
  Stack,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import FormDialog from '../common/FormDialog';
import { Resource, PaginationParams } from '../../types';

const INITIAL_PAGINATION: PaginationParams = {
  page: 0,
  limit: 10,
  total: 0,
};

const columns = [
  { id: 'name', label: 'Kaynak Adı', minWidth: 170 },
  {
    id: 'type',
    label: 'Tür',
    minWidth: 100,
    format: (value: string) => {
      const types = {
        vehicle: 'Araç',
        room: 'Oda',
        hall: 'Salon',
      };
      return types[value as keyof typeof types] || value;
    },
  },
  { id: 'capacity', label: 'Kapasite', minWidth: 100 },
  {
    id: 'status',
    label: 'Durum',
    minWidth: 100,
    format: (value: string) => {
      const statuses = {
        available: 'Müsait',
        reserved: 'Rezerve',
        maintenance: 'Bakımda',
      };
      return statuses[value as keyof typeof statuses] || value;
    },
  },
  {
    id: 'features',
    label: 'Özellikler',
    minWidth: 200,
    format: (value: string[]) => (
      <Stack direction="row" spacing={1}>
        {value?.map((feature) => (
          <Chip key={feature} label={feature} size="small" />
        ))}
      </Stack>
    ),
  },
];

const ResourceManagement = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'room',
    capacity: '',
    status: 'available',
    description: '',
    features: [] as string[],
  });

  // Form işlemleri
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // API çağrısı yapılacak
      setDialogOpen(false);
      // Kaynakları yeniden yükle
    } catch (error) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Tablo işlemleri
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newLimit: number) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 0 }));
  };

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setFormData({
      name: resource.name,
      type: resource.type,
      capacity: resource.capacity.toString(),
      status: resource.status,
      description: resource.description || '',
      features: resource.features || [],
    });
    setDialogOpen(true);
  };

  const handleDelete = async (resource: Resource) => {
    if (window.confirm('Bu kaynağı silmek istediğinize emin misiniz?')) {
      try {
        setLoading(true);
        // API çağrısı yapılacak
        // Kaynakları yeniden yükle
      } catch (error) {
        setError('Kaynak silinirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      {/* Üst toolbar */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedResource(null);
            setFormData({
              name: '',
              type: 'room',
              capacity: '',
              status: 'available',
              description: '',
              features: [],
            });
            setDialogOpen(true);
          }}
        >
          Yeni Kaynak
        </Button>
      </Box>

      {/* Kaynak tablosu */}
      <DataTable
        columns={columns}
        data={resources}
        pagination={pagination}
        loading={loading}
        error={error || undefined}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={(query) => console.log('Search:', query)}
      />

      {/* Kaynak formu dialog */}
      <FormDialog
        open={dialogOpen}
        title={selectedResource ? 'Kaynak Düzenle' : 'Yeni Kaynak'}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kaynak Adı"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tür</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                label="Tür"
              >
                <MenuItem value="room">Oda</MenuItem>
                <MenuItem value="hall">Salon</MenuItem>
                <MenuItem value="vehicle">Araç</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kapasite"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Durum"
              >
                <MenuItem value="available">Müsait</MenuItem>
                <MenuItem value="reserved">Rezerve</MenuItem>
                <MenuItem value="maintenance">Bakımda</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </FormDialog>
    </Box>
  );
};

export default ResourceManagement; 