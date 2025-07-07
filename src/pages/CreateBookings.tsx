import {
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';
import {
  useForm,
  Controller,
  type SubmitHandler,
} from 'react-hook-form';
import ButtonComponent from '../components/button';
import type { AppDispatch, RootState } from '../toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import { bookingThunk } from '../toolkit/bookings/thunk';
import { useEffect } from 'react';
import { workShopThunk } from '../toolkit/workshop/thunk';
import type { bookingInputSchemaType } from '../toolkit/bookings/types';
import type { timeSlotProps } from '../toolkit/timeSlot/types';

const CreateBookings = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data, isLoading } = useSelector(
    (state: RootState) => state.workShopSlice
  );

  const workshops = data?.data || [];

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<bookingInputSchemaType>({
    defaultValues: {
      workshopId: '',
      timeSlotId: '',
    },
    mode: 'onBlur',
  });

  const selectedWorkshopId = watch('workshopId');
  const selectedWorkshop = workshops.find((w) => w.id === selectedWorkshopId);
  const availableTimeSlots: timeSlotProps[] = selectedWorkshop?.timeSlots || [];

  useEffect(() => {
    dispatch(workShopThunk.getAllWorkShop());
  }, [dispatch]);

  const onSubmit: SubmitHandler<bookingInputSchemaType> = async (formData: bookingInputSchemaType) => {
    const res = await dispatch(bookingThunk.createBookingThunk({
      timeSlotId: formData.timeSlotId,
      workshopId: formData.workshopId
    })).unwrap();
    if (res.status === 201) {
      window.location.href = '/my-bookings';
    }
  };

  return (
    <div className="flex w-full md:h-[90vh] items-center justify-center flex-col gap-3">
      <div className="w-full max-w-lg mx-auto px-4 py-6 md:px-10 md:py-10 flex flex-col gap-4 shadow-md rounded-2xl">
        <Typography variant="h5" textAlign="center" mb={1}>
          Create Booking
        </Typography>
        <Controller
          name="workshopId"
          control={control}
          rules={{ required: 'Workshop is required' }}
          render={({ field }) => (
            <Autocomplete
              options={workshops}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={isLoading}
              value={workshops.find((w) => w.id === field.value) || null}
              onChange={(_, newValue) => {
                field.onChange(newValue ? newValue.id : '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Workshop"
                  error={!!errors.workshopId}
                  helperText={errors.workshopId?.message}
                  fullWidth
                />
              )}
            />
          )}
        />


        {/* Time Slot Select */}
        <Controller
          name="timeSlotId"
          control={control}
          rules={{ required: 'Time slot is required' }}
          render={({ field }) => (
            <Autocomplete
              options={availableTimeSlots}
              getOptionLabel={(option) =>
                `${option.startTime} - ${option.endTime}`
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={availableTimeSlots.find((t) => t.id === field.value) || null}
              onChange={(_, newValue) => {
                field.onChange(newValue ? newValue.id : '');
              }}
              disabled={!selectedWorkshopId}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Time Slot"
                  error={!!errors.timeSlotId}
                  helperText={errors.timeSlotId?.message}
                  fullWidth
                />
              )}
            />
          )}
        />


        <ButtonComponent
          sxStyle={{ padding: 1.3 }}
          label="Submit Booking"
          onClick={handleSubmit(onSubmit, err => console.log('err ',err))}
        />
      </div>
    </div>
  );
};

export default CreateBookings;
