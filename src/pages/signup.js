import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom';
import { Button } from './components/button/Button';
import signin from '../images/signin.svg' ;
import Navbar from './components/nav';

export default function Signup() {
  const navigate = useNavigate();

  // Setting user, email, password, cpassword states
  const [user, setuser] = useState('');
  const [email, setemail] = useState('');
  
  const [addr, setAddr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  let currUserId = "";
  let qrcode ="";
  // Keeping track of email/pass validity
  let emailIsValid = false;
  let passlIsValid = false;
  let phoneIsValid = false;


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
   * Compares user input pass with compare pass
   */
  const phoneValidation = () => {    
    if ((phoneNumber.length == 10))  {
      phoneIsValid = true;
    }
    else {
      phoneIsValid = false;   
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

  const fetch2FA = async (userInfo) => {
    try{
      const resp = await fetch("http://localhost:5000/qrauth", {
        method: "get",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(resp);

    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  /**
   * Handles Submit Form
   * @param {Event} event Form Data 
   */
  const submitform = async event => { 
    event.preventDefault();

    emailValidation();
    passValidation();
    phoneValidation();

    // Checking is user entry is valid
    if (emailIsValid && passlIsValid && phoneIsValid) {      
      const userInfo = {
        name : user, 
        email : email, 
        password : password,
        address : addr,
        phoneNumber : phoneNumber,
        mfa: false,
        status: false,
        tempSecret: "",
        locked: false
      }; 
      
      // Fetchig new User ID
      currUserId = await fetchId(userInfo);
      if (currUserId) {
        alert(`User has been successfully added. The User Id is : ${currUserId}`);
        //gen qr
        qrcode = await fetch2FA(userInfo);
        console.log("Tester: ", qrcode);
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
    <Navbar/>
    <div className="signup" id = "signup">
      <div className='signup-form'>
        <h2 className='sign-subheader'>Hi there!</h2>
        <h1 className='sign-header'>Sign Up</h1>
        <div className = "signin-fields">
          <form className='signup-form-form'>
              <input className='input-field' type = "textbox" placeholder="Name"  required value={user} onChange={(e) => setuser(e.target.value)}/>    
              <input className='input-field' type = "Email" placeholder="Email" required value={email} onChange={(e) => setemail(e.target.value)}/>
              <input className='input-field' type = "password" placeholder="Password" required value={password} onChange={(e) => setpassword(e.target.value)}/>
              <input className='input-field' type = "password" placeholder="Confirm your password" required value={cpassword} onChange={(e) => setcpassword(e.target.value)}/> 
              <input className='input-field' type = "text" placeholder="Enter your address" required value={addr} onChange={(e) => setAddr(e.target.value)}/>        
              <input className='input-field' type="tel" placeholder="Enter your phone number" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
          </form>
          <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' onClick={submitform}>
            Sign up
          </Button>
        </div>
      </div>
      <div className='signup-img'>
        <img className='signuppic' src={signin} alt=""/>
      </div>
    </div>
  </>
  )
}