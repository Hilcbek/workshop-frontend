import Button from '@mui/material/Button';
import type { buttonProps } from './types';
import { CircularProgress } from '@mui/material';

export default function ButtonComponent({disabled, label, onClick,sxStyle, variant = 'contained', ...props} : buttonProps) {
  return (
    <Button {...props}  disabled={disabled}  onClick={onClick} sx={{width : "100%",textTransform :"none", ...sxStyle}} variant={variant}>{disabled ? <CircularProgress size={20} /> :  label}</Button>
  );
}
