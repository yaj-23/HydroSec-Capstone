import React from 'react'
import Navbar from './components/nav'

export default function QRAuth() {

  const fetchQR = async (userInfo) => {
    try {
      const resp = await fetch("http://localhost:5000/qrauth", {
        method: "get",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (resp.ok) {
        const userMFa = await resp.json();
        console.log("YO from qr: ", userMFa);
        return userMFa;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const submitform = async event => { 

    // fetchQR(userInfo);
  }

  return (
    <>
        <Navbar/>
        <div id="twoFAFormHolder" className="">
            <img id="qrImage" height="300" width="300" />
            <form id="twoFAUpdateForm" className="">
              <input type="text" name="code" placeholder='2-FA Code' className=""/>
              <button className="btn btn-primary" type="submit">SET</button>
            </form>
        </div>
    </>
  )
}

