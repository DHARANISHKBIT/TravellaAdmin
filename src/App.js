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
import DestinationsPage from './page/Destinotionpage';
import PlacesForDestination from './page/Placefordestination';
import TripBookingDashboard from './page/Bookingdeatils';
import AddPlace from './page/Addplace';
import HotelsPage from './page/Hotelpage';
import CarRentalsPage from './page/CarRentalsPage';
import Userspage from './page/Userspage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/destinationpage" element={<DestinationsPage/>} />
          <Route path="/Addplacefordestination" element={<PlacesForDestination/>} />
          <Route path="/Addplace" element={<AddPlace/>} />
          <Route path="/places" element={<Places />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotelpage" element={<HotelsPage/>} />
          <Route path="/car-rent" element={<CarRent />} />
          <Route path="/car-rent-page" element={<CarRentalsPage/>} />
          <Route path="/bookings" element={<TripBookingDashboard/>} />
          <Route path="/users" element={<Userspage/>} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
