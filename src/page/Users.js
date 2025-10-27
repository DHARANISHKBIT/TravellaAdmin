import React, { useEffect, useState } from "react";
import "./Userspage.css";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🟢 Get token from localStorage
  const token = localStorage.getItem("authToken");

  // 🟢 Fetch users when page loads
  useEffect(() => {
    if (!token) {
      alert("Unauthorized! Please log in again.");
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch("https://travella-server-v2.onrender.com/api/auth/userlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, navigate]);

  return (
    <div className="users-container">
      <h1 className="users-title">Registered Users</h1>

      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : error ? (
        <p className="error-text">Error: {error}</p>
      ) : users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="user-card-grid">
          {users.map((user, index) => (
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
