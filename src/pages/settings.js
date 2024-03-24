import React, { useState, useEffect } from 'react';
import Navbar from './components/nav';
import ActivityCard from './components/card/ActivityCard';
import './settings.css'

const ClientSettings = () => {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await fetch(`http://localhost:5000/userSettings/${userId}`);
                const settingsJSON = await response.json();
                setActivity(settingsJSON['activity']);
            } catch (error) {
                console.log("Error fetching UserSettings:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <h2>Activity Details</h2>
            <div className='activity-container'>
                {activity.reverse().map((item, index) => (
                    <>
                    <ActivityCard key={index} activity={item}/>
                    </>
                ))}
            </div>
        </div>
    )
}

export default ClientSettings;