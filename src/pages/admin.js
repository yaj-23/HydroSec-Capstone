// AdminPage.jsx
import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "./components/nav";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const resp = await fetch("http://localhost:5000/users/getAllDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.ok) {
        const allUsers = await resp.json();
        console.log("ALL USERS: ", allUsers)       
        setUsers(allUsers); 
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users: ", error.message);
    }
  };

  const toggleUserState = async (user) => {
    console.log(user._id);
    console.log(user.email);
    console.log(user.name);
    console.log(user.status);
    try {


      // Update the status (toggle locked/unlocked)
      const updatedStatus = !user.status;

      // Send PUT request to update user status
      const queryString = new URLSearchParams({ email: user.email, status: updatedStatus }).toString(); // Convert email to query string

      const resp = await fetch(`http://localhost:5000/users/updateStatus?${queryString}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        // Update the state with the new user data\
        fetchAllUsers();
        console.log("Test", resp.json());
      } else {
        throw new Error('Failed to update user status');
      }
    } catch (error) {
      console.error("Error updating user status: ", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Admin Page</h2>
        {users.map((user) => (
          <div className="user-card">
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>ID:</strong> {user._id}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Status:</strong> {user.status ? "Locked" : "Unlocked"}
            </div>
            <div>
              <button onClick={() => toggleUserState(user)}>
                {user.status ? "Unlock" : "Lock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminPage;
