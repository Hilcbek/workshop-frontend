export interface analyticsProps {
    totalBookings :  number,
    totalTimeSlotsFilled :  number,
    popularWorkshop :  string
}

export interface analyticsBookingResponse  {
    data: analyticsProps,
    status: number
    message : string
}
export interface initialState {
    data : analyticsBookingResponse | null
    isLoading : boolean
    isError: boolean
    isSuccess: boolean
}

