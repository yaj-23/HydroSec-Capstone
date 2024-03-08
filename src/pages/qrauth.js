import React, { useState } from 'react'
import Navbar from './components/nav'
import { useUser } from '../UserSession'
import { useNavigate } from 'react-router-dom';


export default function QRAuth() {
  const {user ,setLoggedUser, isAdmin, setAdminStatus} = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [accountID, setAccountID] = useState(null);
  const [qrImage, setQrImage] = useState(null);

  const navigate = useNavigate();

  if (user == null) {
    navigate('/');
  }

  const fetchQR = async (userInfo) => {
    try {
      const resp = await fetch("http://localhost:5000/qrauth", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (resp.ok) {
        const image = await resp.json();
        return(image)
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  
  const fetchUserDetails = async() => {
    try{
        const resp = await fetch(`http://localhost:5000/users/${user}/getDetails`);
        const json = await resp.json();
        // console.log(" OK  USEREMAIL: ", json.email)
        // console.log(" OK  AccountID: ", json.accountNumber)
        // setUserEmail(json.email);
        // setAccountID(json.accountNumber);
        // console.log(" OK SO USEREMAIL: ", userEmail)
        // console.log(" OK SO AccountID: ", accountID)
        // console.log("FetchYUSER: ", json);
        return json;
    } catch (error) {
        console.log("error", error);
    }
  }

 

  const submitform = async event => { 
    event.preventDefault();
    let x, y;
    if(userEmail === null){
      x = await fetchUserDetails();
      console.log("blah: ", x)
      console.log(" OK SO USEREMAIL: ", x.email);
      console.log(" OK SO AccountID: ", x.accountNumber);
    }
    y = await fetchQR(x.email);
    console.log(" OK SO image: ", y);

    setQrImage(y)
  }

  return (
    <>
        <Navbar/>
        <div id="twoFAFormHolder" className="">
            <img id="qrImage" height="300" width="300" src={qrImage} />
            <form id="twoFAUpdateForm" className="">
              <input type="text" name="code" placeholder='2-FA Code' className=""/>
              <button className="btn btn-primary" type="submit">SET</button>
              <button className="btn btn-primary" type="submit" onClick={submitform}>Gen QR</button>
            </form>
        </div>
    </>
  )
}

