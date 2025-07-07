import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useRole } from './useRole';
import type { RootState } from '../toolkit/store';
import NotAuthorizedPage from '../components/NotAuthorizedPage';

const RoleBasedRoute = ({
  component: Component,
  requiredRoles,
  auth,
}: {
  component: React.ComponentType;
  requiredRoles?: (
    'user' | 'admin'
  )[];
  auth: 'must' | 'mustnot' | 'optional';
  isProfileNeeded?: boolean;
}) => {
  const { hasRole } = useRole();
  const isAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isLoggedIn
  );
  if (auth === "must" && !isAuthenticated) {
    return <NotAuthorizedPage />;
  }
  if(auth === "mustnot" && isAuthenticated){
    return <Navigate to="/" replace />
  }

    if(requiredRoles){
        if (!hasRole(requiredRoles)) {
            return <Navigate to="/" replace />;
        }
    }
  return <Component />;
};

export default RoleBasedRoute;