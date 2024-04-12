import React, { useState, useEffect } from "react";
import Navbar from "./components/nav";
import { useUser } from "../UserSession";
import { useNavigate } from "react-router-dom";
import './qrauth.css';
import { Button } from "./components/button/Button";


export default function QRAuth() {
  const { user, setLoggedUser, isAdmin, setAdminStatus } = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [accountID, setAccountID] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  if (user == null) {
    navigate("/");
  } else {
    // console.log("USer: ", user);
  }

  const fetchQR = async (userInfo) => {
    try {
      // Convert userInfo object to query string
      const queryString = new URLSearchParams({ email: userInfo }).toString(); // Convert email to query string
      const resp = await fetch(`http://localhost:5000/qrauth?${queryString}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.ok) {
        const image = await resp.json();
        return image;
      } else {
        return null;
      }
    } catch (error) {
      // console.log("Got an error boss", error);
      return null;
    }
  };

  const fetchUserDetails = async () => {
    try {
      const resp = await fetch(
        `http://localhost:5000/users/${user}/getDetails`
      );
      const json = await resp.json();
      return json;
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitform = async (event) => {
    event.preventDefault();
    let x, y;
    if (userEmail === null) {
      x = await fetchUserDetails();
      // console.log("blah: ", x);
      // console.log(" OK SO USEREMAIL: ", x.email);
      // console.log(" OK SO AccountID: ", x.accountNumber);
    }
    y = await fetchQR(x.email);
    // console.log(" OK SO image: ", y);

    setQrImage(y.image);
  };

  useEffect(() => {
    console.log("Updated qrImage:", qrImage);
  }, [qrImage]);

  const submitCode = async (event) => {
    event.preventDefault();
    // console.log("here:", code);
    let x;
    x = await fetchUserDetails();
    let y = x.email.toString();
    let id = x.accountNumber.toString();
    // console.log(x.email.toString());
    const queryString = new URLSearchParams({ code, y, id }).toString();
    const response = await fetch(`http://localhost:5000/set2FA?${queryString}`);
    // const json = response.json()
    const { success } = await response.json();
    // console.log(response.body);
    if (success) {
      alert("2FA has been setup");
      navigate("/dashboard");
    } else {
      console.log("joever");
    }
  };

  return (
    <>
      <Navbar />
      <div id="twoFAFormHolder" className="main-comp">
        <img id="qrImage" height="300" width="300" src={qrImage} />
        <form id="twoFAUpdateForm" className="forms">
          <input
            type="text"
            name="code"
            placeholder="2-FA Code"
            className="input-field"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="set-btn"
            buttonColor="primary"
            buttonSize="btn-medium"
            buttonStyle="btn-primary"
            onClick={submitCode}
          >
            SET
          </Button>
          <div  className="gen-btn">
          <Button
            buttonColor="primary"
            buttonSize="btn-medium"
            buttonStyle="btn-primary"
            type="submit"
            onClick={submitform}
          >
            Gen QR
          </Button>
          </div>
          
        </form>
      </div>
    </>
  );
}
