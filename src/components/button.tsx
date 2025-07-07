import Button from '@mui/material/Button';
import type { buttonProps } from './types';

export default function ButtonComponent({disabled, label, onClick,sxStyle, variant = 'contained', ...props} : buttonProps) {
  return (
    <Button {...props}  disabled={disabled}  onClick={onClick} sx={{width : "100%",textTransform :"none", ...sxStyle}} variant={variant}>{label}</Button>
  );
}
