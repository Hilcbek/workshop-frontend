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
    Collapse,
    IconButton,
    Divider,
} from '@mui/material';
import { useEffect, useCallback, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../toolkit/store';
import { workShopThunk } from '../../toolkit/workshop/thunk';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import type { workshopProps } from '../../toolkit/workshop/types';
import type { timeSlotProps } from '../../toolkit/timeSlot/types';
import type { bookingProps } from '../../toolkit/bookings/types';
import { useNavigate } from 'react-router-dom';

const WorkshopRow = ({ workshop }: { workshop: workshopProps }) => {
    const [open, setOpen] = useState(false);
    const dispatch : AppDispatch = useDispatch()
    const {deleting} = useSelector((state: RootState) => state.workShopSlice);
    const handleWorkShopDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this workshop?');
        if (confirm) {
            await dispatch(workShopThunk.deleteWoshopThunk(Number(id)))
        }
    }
    const navigate = useNavigate()
    return (
        <>
            <TableRow hover>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{workshop.id}</TableCell>
                <TableCell>{workshop.title}</TableCell>
                <TableCell>
                    <Chip
                        label={new Date(workshop.date).toLocaleDateString()}
                        color="primary"
                        variant="outlined"
                    />
                </TableCell>
                <TableCell>
                    <Edit onClick={() => navigate('/admin/update-workshop', {
                        state: {
                            workshop: workshop.id
                        }
                    })} className='cursor-pointer hover:text-teal-500' />
                </TableCell>
                <TableCell>
                    {deleting ? <CircularProgress size={20} /> : <Delete onClick={() => handleWorkShopDelete(workshop.id)} className='cursor-pointer hover:text-rose-500' />}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={4} sx={{ py: 0, backgroundColor: '#fafafa' }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box px={2} py={2}>
                            <Typography variant="subtitle1" fontWeight={500}>
                                Description
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                {workshop.description}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                                Time Slots
                            </Typography>

                            {workshop.timeSlots?.length ? (
                                <Table size="small" sx={{ mb: 2 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Start - End</TableCell>
                                            <TableCell>Capacity</TableCell>
                                            <TableCell>Bookings</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {workshop.timeSlots.map((slot: timeSlotProps) => {
                                            const relatedBookings = workshop.bookings?.filter(
                                                (b: bookingProps) => String(b.timeSlotId) === slot.id
                                            ) || [];

                                            return (
                                                <Fragment key={slot.id}>
                                                    <TableRow>
                                                        <TableCell>{slot.id}</TableCell>
                                                        <TableCell>
                                                            {slot.startTime} - {slot.endTime}
                                                        </TableCell>
                                                        <TableCell>{slot.maxCapacity}</TableCell>
                                                        <TableCell>{relatedBookings.length}</TableCell>
                                                    </TableRow>
                                                    {relatedBookings.length > 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={4} sx={{ pl: 4, backgroundColor: '#fdfdfd' }}>
                                                                <Typography variant="body2" fontWeight={500} gutterBottom>
                                                                    Bookings:
                                                                </Typography>
                                                                <ul style={{ margin: 0, paddingLeft: 16 }}>
                                                                    {relatedBookings.map((booking: bookingProps) => (
                                                                        <li key={booking.id}>
                                                                            {booking.user?.username || 'Unknown User'} —{' '}
                                                                            <Chip
                                                                                size="small"
                                                                                label={booking.status}
                                                                                color={
                                                                                    booking.status === 'pending'
                                                                                        ? 'warning'
                                                                                        : booking.status === 'confirmed'
                                                                                            ? 'success'
                                                                                            : 'error'
                                                                                }
                                                                                variant="outlined"
                                                                                sx={{ ml: 1 }}
                                                                            />
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </Fragment>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No time slots found.
                                </Typography>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const AllWorkShop = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data: workshopData, isLoading } = useSelector(
        (state: RootState) => state.workShopSlice
    );

    const workshops = workshopData?.data || [];

    const fetchAllWorkshops = useCallback(async () => {
        await dispatch(workShopThunk.getAllWorkShop());
    }, [dispatch]);

    useEffect(() => {
        fetchAllWorkshops();
    }, [fetchAllWorkshops]);

    return (
        <Box px={4} py={6}>


            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : workshops.length === 0 ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Typography mt={2}>No workshops found.</Typography>
                </Box>

            ) : (
                <>
                    <Typography variant="h4" fontWeight={300} gutterBottom>
                        All Workshops
                    </Typography>
                    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell>Details</TableCell>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>Title</strong></TableCell>
                                    <TableCell><strong>Date</strong></TableCell>
                                    <TableCell><strong>Edit</strong></TableCell>
                                    <TableCell><strong>Delete</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workshops && workshops?.map((workshop: workshopProps) => (
                                    <WorkshopRow key={workshop.id} workshop={workshop} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>

            )}
        </Box>
    );
};

export default AllWorkShop;
