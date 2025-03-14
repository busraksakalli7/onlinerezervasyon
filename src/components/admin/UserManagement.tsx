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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import FormDialog from '../common/FormDialog';
import { User, PaginationParams } from '../../types';

const INITIAL_PAGINATION: PaginationParams = {
  page: 0,
  limit: 10,
  total: 0,
};

const columns = [
  { id: 'name', label: 'Ad Soyad', minWidth: 170 },
  { id: 'email', label: 'E-posta', minWidth: 170 },
  {
    id: 'role',
    label: 'Rol',
    minWidth: 100,
    format: (value: string) => value === 'admin' ? 'Yönetici' : 'Kullanıcı',
  },
  {
    id: 'status',
    label: 'Durum',
    minWidth: 100,
    format: (value: string) => value === 'active' ? 'Aktif' : 'Pasif',
  },
  {
    id: 'createdAt',
    label: 'Kayıt Tarihi',
    minWidth: 170,
    format: (value: Date) => new Date(value).toLocaleDateString('tr-TR'),
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  });

  // Form işlemleri
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // API çağrısı yapılacak
      setDialogOpen(false);
      // Kullanıcıları yeniden yükle
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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (user: User) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      try {
        setLoading(true);
        // API çağrısı yapılacak
        // Kullanıcıları yeniden yükle
      } catch (error) {
        setError('Kullanıcı silinirken bir hata oluştu');
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
            setSelectedUser(null);
            setFormData({
              name: '',
              email: '',
              role: 'user',
              status: 'active',
            });
            setDialogOpen(true);
          }}
        >
          Yeni Kullanıcı
        </Button>
      </Box>

      {/* Kullanıcı tablosu */}
      <DataTable
        columns={columns}
        data={users}
        pagination={pagination}
        loading={loading}
        error={error || undefined}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={(query) => console.log('Search:', query)}
      />

      {/* Kullanıcı formu dialog */}
      <FormDialog
        open={dialogOpen}
        title={selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ad Soyad"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-posta"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Rol"
              >
                <MenuItem value="user">Kullanıcı</MenuItem>
                <MenuItem value="admin">Yönetici</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </FormDialog>
    </Box>
  );
};

export default UserManagement; 