import { z } from 'zod';
import type { timeSlotProps } from '../timeSlot/types';

export interface bookingInitialState {
  data: bookingResponseProps | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  updateing: boolean
}

export interface bookingProps {
  id: number;
  userId: number;
  workshopId: number;
  timeSlotId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  isDeleted: boolean;


  user: {
    id: number;
    username: string;
  };
  workshop: {
    id: number;
    title: string;
    description?: string;
    date?: string;
    timeSlots :  timeSlotProps[]
    isDeleted :  boolean 
  };
  timeSlot: timeSlotProps;
}

export interface bookingResponseProps {
  data: bookingProps[]; 
  message: string;
  status: number;
}

export const bookingInputSchema = z.object({
  workshopId: z.string({
    required_error: 'Workshop is required',
    invalid_type_error: 'Workshop ID must be a number',
  }),
  timeSlotId: z.string({
    required_error: 'Time slot is required',
    invalid_type_error: 'Time slot ID must be a number',
  }),
});

export type bookingInputSchemaType = z.infer<typeof bookingInputSchema>;

export const bookingUpdateSchema = z.object({
  timeSlotId: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
});

export type bookingUpdateSchemaType = z.infer<typeof bookingUpdateSchema>;
