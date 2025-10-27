import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../page/AdminDashboard.css';

function AdminLayout() {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#1193d4' }}>
            flight_takeoff
          </span>
          <h1>TravelAdmin</h1>
        </div>

        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </NavLink>
        <NavLink to="/destinationpage" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="material-symbols-outlined">explore</span>
          Destinations
        </NavLink>
        {/* <NavLink to="/places" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="material-symbols-outlined">place</span>
          Places
        </NavLink> */}
        <NavLink to="/hotelpage" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="material-symbols-outlined">hotel</span>
          Hotels
        </NavLink>
        <NavLink to="/car-rent-page" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="material-symbols-outlined">directions_car</span>
          Car Rentals
        </NavLink>
        <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="material-symbols-outlined">book_online</span>
          Bookings
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="material-symbols-outlined">group</span>
          Users
        </NavLink>
      </aside>

      {/* Main Content */}
      <main className="main-contentt">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;


