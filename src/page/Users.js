import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([
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

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>User List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>
                  {user.role === "admin" ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {user.role}
                    </span>
                  ) : (
                    <span>{user.role}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default Users;
