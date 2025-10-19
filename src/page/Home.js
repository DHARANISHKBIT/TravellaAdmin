import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="fullpage">
     
        <div className="header">
          <div>
            <p className="title">Welcome, Admin!</p>
            <p className="subtitle">Here's your travel booking system overview.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { title: "Total Bookings", value: "1,234", change: "+5%" },
            { title: "Total Revenue", value: "$56,789", change: "+8%" },
            { title: "New Users", value: "56", change: "+12%" },
            { title: "Active Listings", value: "890", change: "+2%" },
          ].map((stat, i) => (
            <div className="stats-card" key={i}>
              <p>{stat.title}</p>
              <p className="value">{stat.value}</p>
              <p className="change">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {[
            { label: "Add Destination" },
            { label: "Add Hotel" },
            { label: "Add Car Rental" },
            { label: "New Booking", primary: true },
          ].map((btn, i) => (
            <button key={i} className={btn.primary ? "primary" : ""}>
              <span className="material-symbols-outlined">{btn.label === "New Booking" ? "add" : "add_location_alt"}</span>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <ul>
            {[
              { title: "New Booking: #B12345", text: "John Doe booked a trip to Paris." },
              { title: "New User Registered", text: "jane.doe@example.com" },
              { title: "System Alert", text: "Pending approval for new hotel listing." },
              { title: "New Listing Added", text: "The Grand Hotel in New York." },
               { title: "New Booking: #B12345", text: "John Doe booked a trip to Paris." },
              { title: "New User Registered", text: "jane.doe@example.com" },
              { title: "System Alert", text: "Pending approval for new hotel listing." },
              { title: "New Listing Added", text: "The Grand Hotel in New York." },
              
            ].map((act, i) => (
              <li key={i}>
                <div className="activity-info">
                  <div className="icon">✓</div>
                  <div>
                    <p className="title">{act.title}</p>
                    <p className="text">{act.text}</p>
                  </div>
                </div>
                <p>2 min ago</p>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default AdminDashboard;
