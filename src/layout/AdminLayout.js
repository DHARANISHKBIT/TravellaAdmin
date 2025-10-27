import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../page/AdminDashboard.css';

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

        <nav className="sidebar-nav">
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
        </nav>
        
        {/* User Info and Logout */}
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="user-name">{user?.username || 'Admin'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-contentt">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;


