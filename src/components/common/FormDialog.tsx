import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface FormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  submitText?: string;
  cancelText?: string;
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  title,
  onClose,
  onSubmit,
  loading = false,
  children,
  maxWidth = 'sm',
  submitText = 'Kaydet',
  cancelText = 'İptal',
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          {!loading && (
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {children}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={loading}
          color="inherit"
        >
          {cancelText}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={loading}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : undefined}
        >
          {loading ? 'Kaydediliyor...' : submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog; 