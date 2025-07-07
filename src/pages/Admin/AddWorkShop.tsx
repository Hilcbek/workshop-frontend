'use client';

import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { workshopInputSchemaType } from '../../toolkit/workshop/types';
import type { AppDispatch } from '../../toolkit/store';
import { useDispatch } from 'react-redux';
import { workShopThunk } from '../../toolkit/workshop/thunk';

const AddWorkshop = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<workshopInputSchemaType>({
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
    },
    mode: 'onBlur',
  });
  const dispatch : AppDispatch = useDispatch();

  const onSubmit = async (data: workshopInputSchemaType) => {
    await dispatch(workShopThunk.createWorkShopThunk(data))
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: {
            xs: 'fit-content',
            md: '80vh'
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f8f9fa',
          px: 2,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 600,
            borderRadius: 4,
            boxShadow: '0px 2px 2px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight={300}
              textAlign="center"
              mb={3}
              sx={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Add New Workshop
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box mb={3}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Workshop Title"
                      fullWidth
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      InputLabelProps={{ sx: { fontWeight: 300 } }}
                      inputProps={{ style: { fontWeight: 300 } }}
                    />
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Workshop Description"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      InputLabelProps={{ sx: { fontWeight: 300 } }}
                      inputProps={{ style: { fontWeight: 300 } }}
                    />
                  )}
                />
              </Box>

              {/* Date */}
              <Box mb={4}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: 'Date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Workshop Date"
                      disablePast
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: 'outlined',
                          error: !!errors.date,
                          helperText: errors.date?.message,
                          InputLabelProps: { sx: { fontWeight: 300 } },
                          inputProps: { style: { fontWeight: 300 } },
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  fontWeight: 300,
                  textTransform: 'none',
                  borderRadius: 2,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#1565c0',
                  },
                }}
              >
                Create Workshop
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default AddWorkshop;
