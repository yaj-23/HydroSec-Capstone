import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    // Setting user, email, password, cpassword states
    const [user, setuser] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    let currUserId = "";
  
    // Keeping track of email/pass validity
    let emailIsValid = false;
    let passlIsValid = false;
  
  
    /**
     * Checks if the user input email is valid or not
     */
    const emailValidation = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      if (isValidEmail) {
        emailIsValid = true;
      }
      else {
        emailIsValid = false;
      }
    }
  
    /**
     * Compares user input pass with compare pass
     */
    const passValidation = () => {    
      if ((password.length > 8) && (!cpassword.localeCompare(password)))  {
        passlIsValid = true;
      }
      else {
        passlIsValid = false;   
      }
    }
  
    /**
     * 
     * @param {JSON} userInfo User info in JSON format
     * @returns User Id if success / false if fail
     */
    const fetchId = async (userInfo) => {
      try {
        const resp = await fetch("http://localhost:5000/signup", {
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
  
      emailValidation();
      passValidation();
  
      // Checking is user entry is valid
      if (emailIsValid && passlIsValid) {      
        const userInfo = {
          name : user, 
          email : email, 
          password : password
        }; 
        
        // Fetchig new User ID
        currUserId = await fetchId(userInfo);
        if (currUserId) {
          alert(`User has been successfully added. The User Id is : ${currUserId}`);
        }
        else {
          alert("Sign up failed");
        }
      }    
      else {      
        if (!(emailIsValid || passlIsValid)) {
          console.log(emailIsValid, passlIsValid);
          alert("Your email and password is invalid");
        }
        else if (!emailIsValid) {
          alert("Your email is invalid");
        }
        else {
          alert("Your password is invalid");
        }
      }
      navigate('/signin');
    }
      
    return (
    <>
        <div className="signup" id = "signup">
            <h2> Sign up</h2>
                <div className = "signup-fields">
                <form>
                  <input type = "textbox" placeholder="Name"  required value={user} onChange={(e) => setuser(e.target.value)}/>
                  <input type = "Email" placeholder="Email" required value={email} onChange={(e) => setemail(e.target.value)}/>
                  <input type = "password" placeholder="Password" required value={password} onChange={(e) => setpassword(e.target.value)}/>
                  <input type = "password" placeholder="Confirm your password" required value={cpassword} onChange={(e) => setcpassword(e.target.value)}/>
                </form>
            </div>
            <button onClick={submitform}>
              Sign up
            </button>
        </div>
    </>
    )
  }