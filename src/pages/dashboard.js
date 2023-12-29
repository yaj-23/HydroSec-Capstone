import React, { useState, useEffect, useRef } from "react";
import './dashboard.css'
import { useUser } from '../UserSession'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const {user ,setLoggedUser, isAdmin, setAdminStatus} = useUser();
    const navigate = useNavigate();

    if (user == null) {
        navigate('/');
    }

    const handleLogOut =() => {
        setLoggedUser(null);
        setAdminStatus(false);
        navigate('/');
      }

    return(
    <>
        <div>
            Dashboard
        </div>
        <h1>{user}</h1>
        { user != null && (<button  onClick={handleLogOut}>log out</button>)}

    </>
    )
}