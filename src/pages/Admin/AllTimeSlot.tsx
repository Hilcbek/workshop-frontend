import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../toolkit/store';
import { timeSlotThunk } from '../../toolkit/timeSlot/thunk';
import type { timeSlotProps } from '../../toolkit/timeSlot/types';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AllTimeSlot = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: timeSlots, isLoading, updateing } = useSelector(
    (state: RootState) => state.timeSlotSlice
  );

  const fetchTimeSlots = useCallback(async () => {
    await dispatch(timeSlotThunk.getAllTimeSlotsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchTimeSlots();
  }, [fetchTimeSlots]);
  const navigate = useNavigate()

  const deleteTimeSlot = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this time slot?');
    if (confirm) {
      await dispatch(timeSlotThunk.deleteTimeSlotThunk(id))
    }
  }

  return (
    <Box px={4} py={6}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : !timeSlots?.data?.length ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography>No time slots found.</Typography>
        </Box>

      ) : (
        <>
          <Typography variant="h4" gutterBottom fontWeight={300}>
            All Time Slots
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Workshop</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                  <TableCell><strong>Capacity</strong></TableCell>
                  <TableCell><strong>Workshop Date</strong></TableCell>
                  <TableCell><strong>Edit</strong></TableCell>
                  <TableCell><strong>Delete</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeSlots.data.map((slot: timeSlotProps) => (
                  <TableRow key={slot.id} hover>
                    <TableCell>{slot.id}</TableCell>
                    <TableCell>{slot.workshop?.title || 'Untitled Workshop'}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${slot.startTime} - ${slot.endTime}`}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{slot.maxCapacity}</TableCell>
                    <TableCell>
                      {slot.workshop?.date
                        ? new Date(slot.workshop.date).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Edit onClick={() => navigate('/admin/update-timeslot', {
                        state: {
                          timeSlot: slot.id
                        }
                      })} className='hover:text-teal-500 cursor-pointer' />
                    </TableCell><TableCell>
                      {updateing ? <CircularProgress size={20} /> : <Delete onClick={() => deleteTimeSlot(slot.id)} className='hover:text-rose-500 cursor-pointer' />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer></>
      )}
    </Box>
  );
};

export default AllTimeSlot;
