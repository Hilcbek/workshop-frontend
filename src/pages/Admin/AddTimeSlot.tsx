'use client';

import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../toolkit/store';
import type { workshopProps } from '../../toolkit/workshop/types';
import { workShopThunk } from '../../toolkit/workshop/thunk';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import { timeSlotThunk } from '../../toolkit/timeSlot/thunk';

type FormValues = {
  startTime: Date | null;
  endTime: Date | null;
  maxCapacity: number;
  workshopId: number;
};

const AddTimeSlot = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: workshopData, isLoading } = useSelector(
    (state: RootState) => state.workShopSlice
  );

  const workshops: workshopProps[] = workshopData?.data || [];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      startTime: null,
      endTime: null,
      maxCapacity: 1,
      workshopId: 0,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    dispatch(workShopThunk.getAllWorkShop());
  }, [dispatch]);

  const onSubmit = async (data: FormValues) => {
    const formattedData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      startTime: data.startTime ? format(data.startTime, 'hh:mm a') : '',
      endTime: data.endTime ? format(data.endTime, 'hh:mm a') : '',
    };
    
    const res = await dispatch(timeSlotThunk.createTimeSlotThunk(formattedData)).unwrap()
    console.log(res)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: {
            xs: 'fit-content',
            md: '70vh'
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f8f9fa',
          px: 2,
        }}
      >
        <Card sx={{ maxWidth: 600, width: '100%', borderRadius: 4, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={300} textAlign="center" mb={3}>
              Add New Time Slot
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Start Time */}
              <Box mb={3}>
                <Controller
                  name="startTime"
                  control={control}
                  rules={{ required: 'Start time is required' }}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="Start Time"
                      minTime={new Date(0, 0, 0, 10, 0)}
                      maxTime={new Date(0, 0, 0, 12, 0)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.startTime,
                          helperText: errors.startTime?.message,
                          InputLabelProps: { sx: { fontWeight: 300 } },
                          inputProps: { style: { fontWeight: 300 } },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* End Time */}
              <Box mb={3}>
                <Controller
                  name="endTime"
                  control={control}
                  rules={{ required: 'End time is required' }}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="End Time"
                      minTime={new Date(0, 0, 0, 10, 0)}
                      maxTime={new Date(0, 0, 0, 12, 0)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.endTime,
                          helperText: errors.endTime?.message,
                          InputLabelProps: { sx: { fontWeight: 300 } },
                          inputProps: { style: { fontWeight: 300 } },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Max Capacity */}
              <Box mb={3}>
                <Controller
                  name="maxCapacity"
                  control={control}
                  rules={{
                    required: 'Max capacity is required',
                    min: { value: 1, message: 'Must be at least 1' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Max Capacity"
                      fullWidth
                      variant="outlined"
                      error={!!errors.maxCapacity}
                      helperText={errors.maxCapacity?.message}
                      InputLabelProps={{ sx: { fontWeight: 300 } }}
                      inputProps={{ style: { fontWeight: 300 }, min: 1 }}
                    />
                  )}
                />
              </Box>

              {/* Workshop Select */}
              <Box mb={4}>
                <Controller
                  name="workshopId"
                  control={control}
                  rules={{ required: 'Workshop is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Select Workshop"
                      fullWidth
                      variant="outlined"
                      error={!!errors.workshopId}
                      helperText={errors.workshopId?.message}
                      InputLabelProps={{ sx: { fontWeight: 300 } }}
                    >
                      {isLoading ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} />
                        </MenuItem>
                      ) : workshops.length > 0 ? (
                        workshops.map((w) => (
                          <MenuItem key={w.id} value={w.id}>
                            {w.title}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No workshops found</MenuItem>
                      )}
                    </TextField>
                  )}
                />
              </Box>

              {/* Submit Button */}
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
                Submit Time Slot
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default AddTimeSlot;
