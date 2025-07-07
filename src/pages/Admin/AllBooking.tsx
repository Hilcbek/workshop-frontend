import { useCallback, useEffect, useState } from 'react';
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
  Select,
  MenuItem,
  Pagination,
  type SelectChangeEvent,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../toolkit/store';
import { bookingThunk } from '../../toolkit/bookings/thunk';
import type { bookingProps } from '../../toolkit/bookings/types';

const LIMIT = 6;

const AllBooking = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: bookings, isLoading ,updateing} = useSelector(
    (state: RootState) => state.bookingSlice
  );

  const [statusMap, setStatusMap] = useState<Record<number, string>>({});
  const [page, setPage] = useState(1);

  const fetchAllBookings = useCallback(async () => {
    await dispatch(bookingThunk.getAllBookingsThunk({
      page: page,
      limit: LIMIT
    }));
  }, [dispatch, page]);

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  const handleStatusChange = async (
    id: number,
    newStatus: 'pending' | 'confirmed' | 'cancelled',
    timeSlotId: string
  ) => {
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    console.log('newStatus ',newStatus)
    await dispatch(
      bookingThunk.updateBookingThunk({
        id,
        data: {
          status: newStatus,
          timeSlotId: timeSlotId,
        },
      })
    );
  };

  const deleteBookingsHandler = async (id: number) => {
    await dispatch(bookingThunk.deleteBookingThunk(id));
  };

  const totalBookings = bookings?.data || [];
  const totalPages = Math.ceil(totalBookings.length / LIMIT);
  const paginatedBookings = totalBookings.slice((page - 1) * LIMIT, page * LIMIT);

  return (
    <Box px={4} py={6}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : !totalBookings.length ? (
        <Typography align="center" mt={4}>No bookings found.</Typography>
      ) : (
        <>
          <Typography variant="h4" fontWeight={300} gutterBottom>
            All Bookings
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Workshop</strong></TableCell>
                  <TableCell><strong>Time Slot</strong></TableCell>
                  <TableCell><strong>Workshop Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Created At</strong></TableCell>
                  <TableCell><strong>Change Status</strong></TableCell>
                  <TableCell><strong>Delete</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBookings.map((booking: bookingProps) => {
                  const currentStatus = statusMap[booking.id] ?? booking.status;
                  return (
                    <TableRow key={booking.id} hover>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.user?.username}</TableCell>
                      <TableCell>{booking.workshop?.title}</TableCell>
                      <TableCell>
                        {booking.timeSlot?.startTime} - {booking.timeSlot?.endTime}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.workshop?.date ?? '').toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={currentStatus}
                          color={
                            currentStatus === 'pending'
                              ? 'warning'
                              : currentStatus === 'confirmed'
                                ? 'success'
                                : 'error'
                          }
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                       {updateing ? <CircularProgress size={20} /> : <Select
                          size="small"
                          value={currentStatus}
                          onChange={(e: SelectChangeEvent) =>
                            handleStatusChange(
                              booking.id,
                              e.target.value as 'pending' | 'confirmed' | 'cancelled',
                              booking.timeSlotId
                            )
                          }
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="confirmed">Confirmed</MenuItem>
                          <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>}
                      </TableCell>
                      <TableCell>
                        <Delete
                          onClick={() => deleteBookingsHandler(booking.id)}
                          sx={{
                            color: 'error.main',
                            cursor: 'pointer',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
              size="medium"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllBooking;
