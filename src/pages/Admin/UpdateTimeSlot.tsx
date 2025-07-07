import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeSlotThunk } from '../../toolkit/timeSlot/thunk';
import type { AppDispatch, RootState } from '../../toolkit/store';

// Zod schema
const schema = z.object({
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
});

type FormData = z.infer<typeof schema>;

const UpdateTimeSlot = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state: RootState) => state.timeSlotSlice);
  const timeSlotId = useLocation().state.timeSlot;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      startTime: '',
      endTime: '',
    },
  });

  // Fetch existing time slot
  const fetchTimeSlot = useCallback(async () => {
    await dispatch(timeSlotThunk.getSingleTimeSlotsThunk(timeSlotId));
  }, [dispatch, timeSlotId]);

  useEffect(() => {
    fetchTimeSlot();
  }, [fetchTimeSlot]);

  useEffect(() => {
    if (data?.data) {
      reset({
        startTime: data?.data[0].startTime || '',
        endTime: data?.data[0].endTime || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (formValues: FormData) => {
    await dispatch(timeSlotThunk.updateTimeSlotThunk({
      id: timeSlotId,
      startDate : formValues.startTime,
      endDate : formValues.endTime
    }));

    navigate('/admin/all-timeslots'); // Adjust path as needed
  };

  return (
    <Box px={4} py={6} maxWidth={500} mx="auto">
      <Typography variant="h4" fontWeight={300} gutterBottom>
        Update Time Slot
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 4,
          }}
        >
          <TextField
            label="Start Time"
            fullWidth
            {...register('startTime')}
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
          />

          <TextField
            label="End Time"
            fullWidth
            {...register('endTime')}
            error={!!errors.endTime}
            helperText={errors.endTime?.message}
          />

          <Button variant="contained" type="submit" color="primary">
            Update Time Slot
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UpdateTimeSlot;
