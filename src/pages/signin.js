import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './signin.css';
import { useUser } from '../UserSession'

export default function Signin() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let currUserId = "";
    const {setLoggedUser, setAdminStatus} = useUser();
    const navigate = useNavigate();
    /**
     * 
     * @param {JSON} userInfo User info in JSON format
     * @returns User Id if success / false if fail
     */
    const fetchId = async (userInfo) => {
      try {
        const resp = await fetch("http://localhost:5000/signin", {
          method: "post",
          body: JSON.stringify(userInfo),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (resp.ok) {
          const userId = await resp.json();
          return userId;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  
    
    /**
     * Handles Submit Form
     * @param {Event} event Form Data 
     */
    const submitform = async event => { 
      event.preventDefault();
      // Checking is user entry is valid
      
      const userInfo = {
        email : email, 
        password : password
      }; 
      
      // Fetchig new User ID
      currUserId = await fetchId(userInfo);
      if (currUserId) {
        setLoggedUser(currUserId);
        if (email == "admin@gmail.com") {
          setAdminStatus(true);
          navigate("/admin");
          return;
        }
        console.log(`User has successfully logged in: ${currUserId}`);
        navigate("/dashboard");
      }
      else {
        alert("Incorrect User Information");
      }
         
    }

    return(<>
        <div>Sign In</div>
        <div className="signin" id = "signin">
            <h2>Welcome back </h2>
                <div className = "signin-fields">
                <input type = "Email" placeholder="Email" required value={email} onChange={(e) => setemail(e.target.value)}/>
                <input type = "password" placeholder="Password" required value={password} onChange={(e) => setpassword(e.target.value)}/>
            </div>
            <button onClick={submitform}>
                Login
            </button>
            <p>Don't have an account? <a href="./signup"><b>Create one</b></a></p>
        </div>
    </>)
}