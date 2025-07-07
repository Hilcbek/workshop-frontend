import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Select,
    Typography,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingThunk } from '../toolkit/bookings/thunk';
import type { AppDispatch, RootState } from '../toolkit/store';
import type { timeSlotProps } from '../toolkit/timeSlot/types';

const schema = z.object({
    timeSlotId: z.string().min(1, 'Time slot is required'),
});

type FormData = z.infer<typeof schema>;

const UpdateBooking = () => {
    const location = useLocation().state;
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { data, isLoading, updateing } = useSelector((state: RootState) => state.bookingSlice);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { timeSlotId: '' },
    });

    const fetchSingleBooking = useCallback(async () => {
        await dispatch(bookingThunk.getSingleBookingThunk(location.bookingId));
    }, [dispatch, location.bookingId]);

    useEffect(() => {
        fetchSingleBooking();
    }, [fetchSingleBooking]);

    useEffect(() => {
        if (data && data.data[0]) {
            reset({ timeSlotId: String(data.data[0].timeSlotId) });
        }
    }, [data, reset]);

    const onSubmit = async (formValues: FormData) => {
        await dispatch(
            bookingThunk.updateBookingThunk({
                id: Number(location.bookingId),
                data: {
                    timeSlotId: formValues.timeSlotId
                }
            })
        );
        navigate('/my-bookings');
    };

    const booking = data?.data?.[0];
    const availableSlots = booking?.workshop?.timeSlots || [];

    return (
        <Box sx={{
            minHeight: {
                md: '80vh',
                xs: 'fit-content'
        }}} px={2} py={4} display="flex" justifyContent="center" alignItems={"center"}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    p: { xs: 3, md: 5 },
                    boxShadow: 3,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" fontWeight={500} gutterBottom>
                    Update Booking
                </Typography>

                {isLoading || !booking ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        mt={2}
                    >
                        <Typography variant="subtitle1">
                            Workshop: <strong>{booking?.workshop?.title}</strong>
                        </Typography>

                        <FormControl fullWidth error={!!errors.timeSlotId}>
                            <InputLabel id="time-slot-label">Select Time Slot</InputLabel>
                            <Controller
                                name="timeSlotId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="time-slot-label"
                                        label="Select Time Slot"
                                    >
                                        {availableSlots.map((slot: timeSlotProps) => (
                                            <MenuItem key={slot.id} value={String(slot.id)}>
                                                {slot.startTime} - {slot.endTime}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.timeSlotId && (
                                <Typography color="error" fontSize={12} mt={0.5}>
                                    {errors.timeSlotId.message}
                                </Typography>
                            )}
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                                disabled={updateing}
                        >
                                {updateing ? 'Updating...' : 'Update Booking'}
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default UpdateBooking;
  