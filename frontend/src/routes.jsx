import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import BookRoom from "./pages/BookRoom";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/book-room" element={<BookRoom />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/payments" element={<Payments />} />
    </Routes>
  );
};

export default AppRoutes;