import React, { useEffect, useState } from "react";
import "./Userspage.css";
import { useAuth } from "../context/AuthContext"; // ✅ Import AuthContext

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth(); // ✅ Get token & username from context

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError("");

      

      try {
        const response = await fetch("https://travella-server-v2.onrender.com/api/auth/userlist", {
          method: "GET", // ✅ Usually user list = GET request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();
        console.log("Fetched users:", data);

        if (!response.ok) {
          setError(data.message || "Failed to load users.");
          return;
        }

        // ✅ Handle both array or wrapped object
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.users) {
          setUsers(data.users);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("An unexpected error occurred while fetching users.");
      } finally {
        setIsLoading(false);
      }
    };

    // 🧠 Only fetch if user is logged in
    if (user?.token) {
      fetchUsers();
    } else {
      setError("Unauthorized: Please log in as admin to view user list.");
    }
  }, [user]);

  // 🟢 Filter only users (not admins)
  const filteredUsers = users.filter((u) => u.role === "user");

  return (
    <div className="users-container">
      <h1 className="users-title">User List</h1>

      {isLoading ? (
        <p className="loading-text">Loading users...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : filteredUsers.length === 0 ? (
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
