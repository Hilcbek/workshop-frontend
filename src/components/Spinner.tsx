import { ClipLoader } from 'react-spinners';
import type { spinnersProps } from './types';
const SpinnersComponent = ({
  loading = false,
  size = 20,
  color = '#0070f3',
}: spinnersProps) => {
  return (
    <ClipLoader
      color={color}
      loading={loading}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default SpinnersComponent;