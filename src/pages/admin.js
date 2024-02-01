// AdminPage.jsx

import React, { useState } from 'react';
import './admin.css';
import Navbar from "./components/nav";

const AdminPage = () => {
  const dummyUsers = [
    { id: 1, username: 'user1', name: 'John Doe', email: 'john@example.com', locked: false },
    { id: 2, username: 'user2', name: 'Jane Doe', email: 'jane@example.com', locked: true },
    // Add more dummy users as needed
  ];

  const [userStates, setUserStates] = useState(dummyUsers.map(user => user.locked));

  const toggleUserState = (userId) => {
    setUserStates(prevStates => prevStates.map((state, index) => (index === userId - 1 ? !state : state)));
  };

  return (<>
    <Navbar />
    <div className="container">
      <h2>Admin Page</h2>
      {dummyUsers.map(user => (
        <div key={user.id} className="user-card">
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Status:</strong> {userStates[user.id - 1] ? 'Locked' : 'Unlocked'}
          </div>
          <div>
            <button onClick={() => toggleUserState(user.id)}>
              {userStates[user.id - 1] ? 'Unlock' : 'Lock'}
            </button>
          </div>
        </div>
      ))}
    </div>
  </>);
};

export default AdminPage;
