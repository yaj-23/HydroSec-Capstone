import React, { useState, useEffect } from "react";
// import BasicLogViewer from "./components/BasicLogViewer"; // Import BasicLogViewer component
import Navbar from "./components/nav";
import { LazyLog } from 'react-lazylog';
import './admin.css'
import { Button } from "./components/button/Button";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [log_msg, setLogMsg] = useState("");
  const [log_id, setLogid] = useState("");
 
  // Fetch all users when the component mounts
  useEffect(() => {
    fetchAllUsers();
    fetchLatestLog();
    // Call fetchLatestLog every 20 seconds
    const interval = setInterval(fetchLatestLog, 20000);
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);

  const fetchLatestLog = async () => {
    try {
      const resp = await fetch('http://localhost:5000/fetchLatestLog');
      if (resp.ok) {
        const latestLogData = await resp.json();
        console.log("Latest Log Data:", latestLogData);
        setLogMsg(latestLogData.logdata);
        setLogid(latestLogData._id);
      } else {
        console.error('Failed to fetch log data');
      }
    } catch (error) {
      console.error('Error fetching log data:', error);
    }
  };


  const addLogToDatabase = async () => {
    try {
      const resp = await fetch("http://localhost:5000/addLogToDatabase", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        console.log("Log data stored successfully");
      } else {
        throw new Error("Failed to add log data to the database");
      }
    } catch (error) {
      console.error("Error adding log data to the database:", error.message);
    }
  };


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

  const deleteUser = async (userId) => {
    try {
      const resp = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        fetchAllUsers(); // Refresh the user list after deletion
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error("Error deleting user: ", error.message);
    }
  };

  
  setInterval(addLogToDatabase, 100000);


  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="admin-left">
          <div className="container">
            <h2>Admin Page</h2>
            {users.map((user) => (
              <div className="user-card" key={user._id}>
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
                <div className="userCard-btns">
                  <Button  onClick={() => toggleUserState(user)} buttonColor='primary' buttonSize='btn-small' buttonStyle='btn-primary'>
                    {user.status ? "Unlock" : "Lock"}
                  </Button>                  
                  <Button  onClick={() => deleteUser(user._id)} buttonColor='primary' buttonSize='btn-small' buttonStyle='btn-primary'>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-right">
          <div className="container">
            <h2>Latest Log Entry</h2>
            {log_msg ? (
              <div className="log-entry">
                <div><strong>Timestamp:</strong> {log_id}</div>
              </div>
            ) : (
              <div>No log entries available</div>
            )}
          </div>
          {log_msg ? (
            <LazyLog text={log_msg} height={500} width={1450} enableSearch />
          ) : (
            <div>No log entries available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
