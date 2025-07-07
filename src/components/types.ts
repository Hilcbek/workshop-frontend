import type { SxProps } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';
import type { Theme, TypographyProps } from '@mui/system';
import {type FieldErrors, type FieldValues, type Path, type UseFormRegister,} from 'react-hook-form'
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button';
export interface inputProps<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'error' | 'helperText'> {
    name : Path<T>,
    variant?: 'outlined' | 'filled' | 'standard';
    id : Path<T>
    register : UseFormRegister<T>
    errors : FieldErrors<T>
    label : string
    required ?:boolean
    sxStyle? : SxProps<Theme>
}
export interface buttonProps extends Omit<MUIButtonProps, 'children'> {
    label : string
    onClick : () => void
    sxStyle? : SxProps<Theme>
    disabled? : boolean
    variant? : 'contained' | 'outlined' | 'text'
}
export interface labelProps extends Omit<TypographyProps, 'variant'> {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline';
    content:string
    sxStyle? : SxProps<Theme>

}
export interface spinnersProps {
    loading?: boolean;
    size?: number;
    color?: string;
  }