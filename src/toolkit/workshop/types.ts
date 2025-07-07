import type { bookingProps } from "../bookings/types"
import type { timeSlotProps } from "../timeSlot/types"
import {z } from 'zod'
export interface workshopProps {
    id: string
    title: string
    description: string
    date: string
    timeSlots: timeSlotProps[]
    bookings: bookingProps[]
    isDeleted: string
}
export interface workshopResponseProps {
    data: workshopProps[]
    message: string
    status: number
}
export interface initialState {
    data: workshopResponseProps | null
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
}
export const workShopSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
})
export type workshopInputSchemaType = z.infer<typeof workShopSchema>
export type updateWorkShopSchemaType = Partial<workshopInputSchemaType>