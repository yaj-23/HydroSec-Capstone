import React from 'react'
import Navbar from './components/nav'

export default function QRAuth() {
  return (
    <>
        <Navbar/>
        <div id="twoFAFormHolder" className="d-flex flex-column align-items-center gap-3">
            <img id="qrImage" height="300" width="300" />
            <form id="twoFAUpdateForm" className="d-flex flex-column gap-2">
              <input type="text" name="code" placeholder='2-FA Code' className="form-control"/>
              <button className="btn btn-primary" type="submit">SET</button>
            </form>
        </div>
    </>
  )
}

