import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../toolkit/store';
import { bookingThunk } from '../toolkit/bookings/thunk';
import { useCallback, useEffect } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'error',
};

const MyBooking = () => {
  const { data: bookings, isLoading } = useSelector(
    (state: RootState) => state.bookingSlice
  );
  const dispatch: AppDispatch = useDispatch();

  const fetchAllBooking = useCallback(async () => {
    await dispatch(bookingThunk.getAllLoggedUserBookingsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchAllBooking();
  }, [fetchAllBooking]);

  const navigate = useNavigate()

  const handleDelete = async (bookingId: number,) => {
    const confirm = window.confirm('Are you sure you want to delete this booking?');
    if (confirm) {
      await dispatch(bookingThunk.deleteBookingThunk(bookingId))
    }
  };

  return (
    <Box px={4} py={6}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : bookings && bookings?.data?.length === 0 ? (
        <Typography mt={2}>No bookings found.</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 3,
            mt: 2,
          }}
        >
          {bookings?.data.map((booking) => (
            <Card key={booking.id} variant="outlined" sx={{ borderRadius: 3, p: 1.5 }}>
              <CardContent>
                <Stack spacing={1.5}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight={600}>
                      <BookmarkIcon sx={{ fontSize: 20, mr: 1, verticalAlign: 'middle' }} />
                      {booking?.workshop?.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton color="primary" size="small" onClick={() => navigate('/update-booking', {state : {bookingId: booking.id}})}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" size="small" onClick={() => handleDelete(booking.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarMonthIcon color="action" fontSize="small" />
                    <Typography color="text.secondary">
                      {new Date(booking?.workshop?.date ?? '').toLocaleDateString()}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeIcon color="action" fontSize="small" />
                    <Typography color="text.secondary">
                      {booking?.timeSlot?.startTime} - {booking?.timeSlot?.endTime}
                    </Typography>
                  </Stack>

                  <Chip
                    label={booking.status.toUpperCase()}
                    color={statusColors[booking.status] ?? 'default'}
                    size="small"
                    sx={{ width: 'fit-content', mt: 1 }}
                  />

                  <Typography color="text.secondary" fontSize={12}>
                    Created At: {new Date(booking.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyBooking;
