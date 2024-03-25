import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './signin.css';
import { useUser } from '../UserSession';
import signin from '../images/signin.svg' ;
import Navbar from './components/nav';
import { Button } from './components/button/Button';


export default function Signin() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  // const [mfa, setMfa] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0);
  const [failedAttemptsInfo, setFailedAttemptsInfo] = useState([]);
  let currUserId = "";
  let currMfaStatus = false;
  let currentUserStatus = false;
  const {setLoggedUser, setAdminStatus} = useUser();
  const navigate = useNavigate();

  /**
   * 
   * @param {JSON} userInfo User info in JSON format
   * @returns User Id if success / false if fail
   */

  const fetchId = async (userInfo) => {
    try {
      console.log(userInfo)
      const resp = await fetch("http://localhost:5000/signin", {
        method: "post",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (resp.ok) {
        const userId = await resp.json();
        console.log("UserID: ", userId);
        return userId;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetechMfa = async (userInfo) => {
    try {
      const resp = await fetch("http://localhost:5000/fetchMFA", {
        method: "post",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (resp.ok) {
        const userMFa = await resp.json();
        console.log("UserMFA: ", userMFa);
        return userMFa;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchUserStatus = async (userInfo) => {
    try {
      const resp = await fetch("http://localhost:5000/fetchUserStatus", {
        method: "post",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (resp.ok) {
        const userStatus = await resp.json();
        console.log("UserSTatus: ", userStatus);
        return userStatus;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleUserActivity = async (userId, failedAttempt) => {
    const response = await fetch(`https://geolocation-db.com/json/`);
    const geoLocation = await response.json();

    // const ipAddress = geoLocation['IPv4'];
    const ipAddress = "XX.XXX.XXX.XXX"
    const location = `${geoLocation['city']}, ${geoLocation['state']}`;
    let userAgent = navigator.userAgent.toLowerCase();
    let browsers = ['Firefox', 'Chrome', 'Safari', 'Opera', 'Edge', 'msie'];
    let browserName = browsers.find(browser => userAgent.includes(browser.toLowerCase())) || 'Unknown';
    if (browserName == 'msie') {
      browserName = "Microsoft Internet Explorer"
    }
    browserName = browserName.charAt(0).toUpperCase() + browserName.slice(1);
    const operatingSystem = navigator.platform;
    const currentDate = new Date().toLocaleDateString('en-US');
    const timestamp = new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});

    // Creating the activity object
    const activity = {
      type: "SUCCESSFUL_LOGIN",
      ip: ipAddress,
      location: location,
      browser: browserName,
      os: operatingSystem,
      date: currentDate,
      timestamp: timestamp
    };

    if (failedAttempt) {
      setFailedLoginAttempts(failedLoginAttempts + 1);
      activity.type = "FAILED_LOGIN"
      setFailedAttemptsInfo(failedAttemptsInfo => [...failedAttemptsInfo, activity])
      console.log(failedAttemptsInfo)
      return;
    }

    for (let i = 0; i < failedLoginAttempts; i++) {
      const resp = await fetch(`http://localhost:5000/userSettings/${userId}/activity`, {
        method: "post",
        body: JSON.stringify(failedAttemptsInfo[i]),
        headers: {"Content-Type": "application/json"},
      });
    }

    const resp = await fetch(`http://localhost:5000/userSettings/${userId}/activity`, {
      method: "post",
      body: JSON.stringify(activity),
      headers: {"Content-Type": "application/json"},
    });

    localStorage.setItem('userId', userId);
  }
  
  /**
   * Handles Submit Form
   * @param {Event} event Form Data 
   */
  const submitform = async event => { 
    event.preventDefault();
    // Checking is user entry is valid
    
    const userInfo = {
      email : email, 
      password : password,
    };
    
    // Fetchig new User ID
    currUserId = await fetchId(userInfo);
    currMfaStatus = await fetechMfa(userInfo);
    currentUserStatus = await fetchUserStatus(userInfo);
    // setMfa(currMfaStatus);
    if (currUserId) {
      setLoggedUser(currUserId);
      console.log("CurrUSerID: ", currUserId);
      if (email == "admin@gmail.com") {
        setAdminStatus(true);
        navigate("/admin");
        return;
      }
      else if (currentUserStatus==true){
        console.log("Your account is locked. Try Again");
        navigate("/");
      }
      else{
        console.log(`User has successfully logged in: ${currUserId}`);
        handleUserActivity(currUserId, false);
        if (currMfaStatus == false){
          console.log("MFA STATUS IS FALSE *** Navigating to QR AUTH");
          navigate("/qrauth");
        }
        else {
          navigate("/dashboard");
        }
      }
    }
    else {
      alert("Incorrect User Information");
      handleUserActivity(currUserId, true);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return(
    <>  
      <Navbar/>
      <div className="signin" id = "signin">
        <div className='signin-form'>
          <h2 className='sign-subheader'>Welcome back </h2>
          <h1 className='sign-header'>Sign In</h1>
          <div className = "signin-fields">
            <input className='input-field' type = "email" placeholder="Email" required value={email} onChange={(e) => setemail(e.target.value)}/>          
            <div>
              {showPassword ? (
                <input
                  className='input-field'
                  type='text'
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <input
                  className='input-field'
                  type='password'
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              <button className='showPass' type='button' onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
          </div>
          <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'onClick={submitform}>
              Login
          </Button>
          <p className='signup-prompt'>Don't have an account? <a href="./signup"><b><span className='different-color'>Create one</span></b></a></p>
        </div>
        <div className='signin-img'>
          <img className='signinpic' src={signin} alt=""/>
        </div>
      </div>
    </>
  )
}