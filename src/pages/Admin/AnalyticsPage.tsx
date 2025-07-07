import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { analyticsThunk } from '../../toolkit/analytics/thunk';
import type { AppDispatch, RootState } from "../../toolkit/store";

const AnalyticsPage = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.analyticsSlice);
  const dispatch: AppDispatch = useDispatch();

  const fetchAnalytics = useCallback(() => {
    dispatch(analyticsThunk.getMyBookingsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (isLoading || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        📊 Workshop Analytics
      </Typography>

      {/* CARD FLEX ROW */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="flex-start"
        mt={2}
      >
        <Box flex="1 1 250px" minWidth="250px">
          <Card sx={{ borderRadius: 3, bgcolor: '#f5f5f5', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h3" color="primary">
                {data?.data?.totalBookings}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 250px" minWidth="250px">
          <Card sx={{ borderRadius: 3, bgcolor: '#f5f5f5', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">Time Slots Filled</Typography>
              <Typography variant="h3" color="secondary">
                {data?.data?.totalTimeSlotsFilled}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 250px" minWidth="250px">
          <Card sx={{ borderRadius: 3, bgcolor: '#f5f5f5', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">Most Popular Workshop</Typography>
              <Typography variant="h5" color="success.main">
                {data?.data?.popularWorkshop ?? 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          📈 Visual Summary
        </Typography>

        {/* CHARTS FLEX ROW */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
          mt={2}
          justifyContent="flex-start"
        >
          <Box flex="1 1 300px" minWidth="300px">
            <Typography variant="subtitle1" gutterBottom>
              Booking Distribution
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: data?.data?.totalBookings ?? 0, label: 'Booked' },
                    { id: 1, value: Math.max(10 - (data?.data?.totalBookings ?? 0), 0), label: 'Available' },
                  ],
                },
              ]}
              width={400}
              height={300}
            />
          </Box>

          <Box flex="1 1 300px" minWidth="300px">
            <Typography variant="subtitle1" gutterBottom>
              Slots Filled Overview
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: data?.data?.totalTimeSlotsFilled ?? 0, label: 'Filled' },
                    { id: 1, value: Math.max(10 - (data?.data?.totalTimeSlotsFilled ?? 0), 0), label: 'Available' },
                  ],
                },
              ]}
              width={400}
              height={300}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
