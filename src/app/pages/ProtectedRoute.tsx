import { Navigate, useLocation } from 'react-router';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}