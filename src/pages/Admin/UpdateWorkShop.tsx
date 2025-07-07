import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workShopThunk } from '../../toolkit/workshop/thunk';
import type { AppDispatch, RootState } from '../../toolkit/store';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
});

type FormData = z.infer<typeof schema>;

const UpdateWorkShop = () => {
  const { data, isLoading } = useSelector(
    (state: RootState) => state.workShopSlice
  );

  const workshopId = useLocation().state.workshop;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
    },
  });

  const fetchWorkshop = useCallback(async () => {
    await dispatch(workShopThunk.getSingledeleteWoshopThunk(workshopId));
  }, [dispatch, workshopId]);

  useEffect(() => {
    fetchWorkshop();
  }, [fetchWorkshop]);

  useEffect(() => {
    if (data?.data) {
      reset({
        title: data.data[0].title,
        description: data.data[0].description,
        date: new Date(data.data[0].date).toISOString().split('T')[0], // convert to yyyy-mm-dd
      });
    }
  }, [data, reset]);

  const onSubmit = async (formValues: FormData) => {
    await dispatch(
      workShopThunk.updateWoshopThunk({
        id: workshopId,
        data: {
          title: formValues.title,
          description: formValues.description,
          date: new Date(formValues.date),
        },
      })
    );
    navigate('/admin/all-workshops');
  };

  return (
    <Box
      className="w-full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={6}
      px={2}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        maxWidth={500}
        width="100%"
        display="flex"
        flexDirection="column"
        gap={3}
        p={4}
        boxShadow={3}
        borderRadius={3}
      >
        <Typography variant="h5" fontWeight={500} textAlign="center">
          Update Workshop
        </Typography>

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Title"
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UpdateWorkShop;
