import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Home from './page/Home';
import Destination from './page/Destination';
import Hotels from './page/Hotels';
import CarRent from './page/CarRent';
import Places from './page/Places';
import Bookings from './page/Bookings';
import Users from './page/Users';
import Reports from './page/Reports';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/places" element={<Places />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/car-rent" element={<CarRent />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
