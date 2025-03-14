import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { PaginationParams } from '../../types';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  pagination: PaginationParams;
  loading?: boolean;
  error?: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  onSearch?: (query: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  pagination,
  loading = false,
  error,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  onView,
  onSearch,
}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Arama alanı */}
      {onSearch && (
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            label="Ara"
            variant="outlined"
            size="small"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Box>
      )}

      {/* Hata mesajı */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Tablo */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel>
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {(onEdit || onDelete || onView) && (
                <TableCell align="right">İşlemler</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  {(onEdit || onDelete || onView) && (
                    <TableCell align="right">
                      {onView && (
                        <Tooltip title="Görüntüle">
                          <IconButton size="small" onClick={() => onView(row)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onEdit && (
                        <Tooltip title="Düzenle">
                          <IconButton size="small" onClick={() => onEdit(row)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title="Sil">
                          <IconButton size="small" onClick={() => onDelete(row)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sayfalama */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.limit}
        page={pagination.page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
        labelRowsPerPage="Sayfa başına satır:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} / ${count !== -1 ? count : `${to}'den fazla`}`
        }
      />
    </Paper>
  );
};

export default DataTable; 