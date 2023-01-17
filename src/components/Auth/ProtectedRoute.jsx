import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../state/UserContext.jsx';

export default function ProtectedRoute() {
  const user = useUser();
  if (!user) return <Navigate to="auth" />;

  return <Outlet />;
}
