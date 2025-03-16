import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>; // Show a loader while checking user state

  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
