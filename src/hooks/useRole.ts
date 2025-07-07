import { useSelector } from 'react-redux';
import type { RootState } from '../toolkit/store';

export const useRole = () => {
  const userData = useSelector((state: RootState) => state.userSlice);
  const userRole = userData?.data?.data[0].role; 

  const hasRole = (requiredRoles: string[]) => {
    return requiredRoles.includes(userRole || '');
  };

  return { hasRole };
};