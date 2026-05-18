import { Navigate, useLocation } from 'react-router-dom';

/** @deprecated Use /products — kept for backward-compatible links */
const InventoryPage = () => {
  const location = useLocation();
  return <Navigate to={`/products${location.search}`} replace />;
};

export default InventoryPage;
