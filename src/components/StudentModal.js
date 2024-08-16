import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define the validation schema
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.date().required('Date of birth is required').typeError('Invalid date format'),
  class: yup.string().required('Class is required'),
  guardianName: yup.string().required('Guardian name is required'),
  guardianContact: yup.string().required('Guardian contact is required'),
});

const StudentModal = ({ open, onClose, onSubmit, loading }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      class: '',
      guardianName: '',
      guardianContact: '',
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-student-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, // Increased width for better two-row layout
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Create Student</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap={2}
            mb={2}
          >
            <Box>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small" // Smaller size
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    size="small" // Smaller size
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    fullWidth
                    size="small" // Smaller size
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="class"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Class"
                    variant="outlined"
                    fullWidth
                    size="small" // Smaller size
                    error={!!errors.class}
                    helperText={errors.class?.message}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="guardianName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Guardian Name"
                    variant="outlined"
                    fullWidth
                    size="small" // Smaller size
                    error={!!errors.guardianName}
                    helperText={errors.guardianName?.message}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="guardianContact"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Guardian Contact"
                    variant="outlined"
                    fullWidth
                    size="small" // Smaller size
                    error={!!errors.guardianContact}
                    helperText={errors.guardianContact?.message}
                  />
                )}
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentModal;
