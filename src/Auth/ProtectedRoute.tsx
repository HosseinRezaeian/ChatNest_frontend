import { Navigate, Outlet } from 'react-router-dom';
import { useProfileQuery } from '../api/api';

export function ProtectedLayout() {
  const { data, isLoading, error } = useProfileQuery();

  if (isLoading) return <div>در حال بررسی وضعیت ورود...</div>;

  if (error) return <Navigate to="/login" replace />;

  return <Outlet />;
}
