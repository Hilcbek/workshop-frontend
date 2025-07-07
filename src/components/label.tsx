import Typography from '@mui/material/Typography';
import type { labelProps } from './types';

export default function Label({content, variant, sxStyle} : labelProps,) {
  return (
    <Typography sx={{...sxStyle}} variant={variant} gutterBottom>
    {content}
  </Typography>
  );
}
