import z from "zod"
import type { Booking } from '../../../../backend/src/generated/prisma/index';
import type { workshopProps } from "../workshop/types";

export interface timeSlotProps {
    id: string
    startTime: string
    endTime: string
    maxCapacity: number
    workshop: workshopProps
    workshopId: string
    bookings: Booking[]
    isDeleted: string
}
export interface timeSlotResponseProps {
    data: timeSlotProps[]
    message: string
    status: number
}
export interface initialState {
    data: timeSlotResponseProps | null
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    updateing : boolean
}
export const timeSlotInputSchema = z.object({
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    maxCapacity: z.number().min(1),
    workshopId: z.number().min(1),
})

export type timeSlotInputSchemaType = z.infer<typeof timeSlotInputSchema>