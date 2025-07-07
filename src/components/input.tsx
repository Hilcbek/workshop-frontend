import TextField from '@mui/material/TextField';
import type { inputProps } from './types';
import type { FieldValues } from 'react-hook-form';

export default function Input<T extends FieldValues>({
    name,
    variant = 'outlined',
    id,
    errors,
    label,
    register, 
    required,
    sxStyle,
    ...props
} : inputProps<T>) {
  return (
      <TextField {...props} sx={{...sxStyle, width : "100%", '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#a3a3a3', // default border
        borderWidth : .5
      },
      '&:hover fieldset': {
        borderColor: '#a3a3a3', // hover border
        borderWidth : .5
      },
      '&.Mui-focused fieldset': {
        borderColor: '#a3a3a3', // active/focus border
        borderWidth : .5
      },
      '&.Mui-error fieldset': {
        borderColor: 'red', // error border
        borderWidth : .5
      }
    },
    '& .MuiInputLabel-root': {
      color: '#6b7280', // default label color (gray-500)
      
      
      '&.Mui-focused': {
        color: '#a3a3a3', // focused label
        
      },
      '&.Mui-error': {
        color: '#f43f5e', // error label
        
      },
    },}} error={!!errors[id]} helperText={errors[id]?.message as string} {...register(id, {required : required})} id={id} name={name} label={label} variant={variant} />
    
  );
}
