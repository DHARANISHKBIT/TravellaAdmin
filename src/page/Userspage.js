import React, { useState } from "react";
import "./Userspage.css";

function Users() {
  const [users] = useState([
    {
      _id: "68f4dc532afe76076fec4611",
      username: "testuser",
      email: "test@email.com",
      role: "user",
    },
    {
      _id: "68f4de2340d0d84a5ebefc47",
      username: "adminuser",
      email: "admin@email.com",
      role: "admin",
    },
    {
      _id: "68f5176da3fd88f21de549a4",
      username: "prasanth",
      email: "prasanth.it23@bitsathy.ac.in",
      role: "user",
    },
    {
      _id: "68fb9e12b7dd9b20e21d0f21",
      username: "johndoe",
      email: "john@example.com",
      role: "admin",
    },
    {
      _id: "68fbbf22ba69a68fb00090d8",
      username: "prasanth45bit",
      email: "prasanthpalanisamy4@gmail.com",
      role: "user",
    },
    {
      _id: "68fcec6af19d914756f954cd",
      username: "dharanish",
      email: "dharanish@example.com",
      role: "user",
    },
    {
      _id: "68fcf392f19d914756f9550b",
      username: "Thiruselvan",
      email: "thiruselvan.cs23@bitsathy.ac.in",
      role: "user",
    },
    {
      _id: "68fcf5a3f19d914756f9552b",
      username: "Harini",
      email: "harinishanmugaa24@gmail.com",
      role: "user",
    },
  ]);

  // 🟢 Filter only users
  const filteredUsers = users.filter((user) => user.role === "user");

  return (
    <div className="users-container">
      <h1 className="users-title">User List</h1>

      {filteredUsers.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="user-card-grid">
          {filteredUsers.map((user, index) => (
            <div key={user._id} className="user-card">
              <div className="user-card-header">
                <span className="user-index">#{index + 1}</span>
                <span className="user-role user-role-text">{user.role}</span>
              </div>
              <div className="user-card-body">
                <h3 className="user-name">{user.username}</h3>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
