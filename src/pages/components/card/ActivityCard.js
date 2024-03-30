import React from "react";

const ActivityCard = ({activity}) => {
    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
        padding: '1%',
        margin: '1%',
        display: 'flex',
        width: '50%',
    };

    const leftStyle = {
        display: 'flex',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const rightStyle = {
        display: 'flex',
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return(
        <div style={cardStyle}>
            <div style={leftStyle}>
            {activity.type == 'SUCCESSFUL_LOGIN' ? (
                <img src="success.png" alt="Success" width="64px" height="64px" />
            ) : <img src="failure.png" alt="Failure" width='64px' height='64px'></img>
            }
            </div>
            <div style={rightStyle}>
                <p>{activity.type == 'SUCCESSFUL_LOGIN' ? 'Successful Login' : 'Failed Login'}: {activity.location} ({activity.ip})</p>
                <p>{activity.browser}, {activity.os}</p>
                <p>Last Activity: {activity.date} at {activity.timestamp}</p>
            </div>
        </div>
    )
}

export default ActivityCard;