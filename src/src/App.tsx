import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HostelSearch from './pages/HostelSearch';
import HostelDetails from './pages/HostelDetails';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import RoommateFinder from './pages/RoommateFinder';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hostels" element={<HostelSearch />} />
        <Route path="/hostels/:id" element={<HostelDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/roommates" element={<RoommateFinder />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/staff/*" element={<StaffDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
